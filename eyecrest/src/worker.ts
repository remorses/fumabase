/* -----------------------------------------------------------------------
   Cloudflare Worker + Durable Object (SQLite) - Generic File API
   -------------------------------------------------------------------- */
import {Response} from "spiceflow";
import { McpAgent } from "agents/mcp";
import { DurableObject } from "cloudflare:workers";
import { Spiceflow } from "spiceflow";
import { cors } from "spiceflow/cors";
import { openapi } from "spiceflow/openapi";
import { mcp, addMcpTools } from "spiceflow/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { importSPKI, jwtVerify } from "jose";
import Slugger from "github-slugger";
import { parseMarkdownIntoSections, isSupportedMarkdownFile, Section } from "./markdown-parser.js";
import { computeGitBlobSHA, verifySHA } from "./sha-utils.js";
import { cleanMarkdownContent } from "./markdown-cleaner.js";
import { parseTar } from "@xmorse/tar-parser";


// Valid Cloudflare Durable Object regions
const VALID_REGIONS = ['wnam', 'enam', 'weur', 'eeur', 'apac', 'me', 'sam', 'oc', 'afr'] as const;
type DurableObjectRegion = typeof VALID_REGIONS[number];

// Supported file extensions for import
const SUPPORTED_EXTENSIONS = ['.md', '.mdx'] as const;
type SupportedExtension = typeof SUPPORTED_EXTENSIONS[number];

// DatasetConfig is eventually consistent. stored in KV. it must only be used for things that are immutable. never updated.
interface DatasetConfig {
  primaryRegion: DurableObjectRegion;
  orgId: string;
  replicaRegions?: DurableObjectRegion[];
}


/* ---------- SQLite Table Types ---------------------------- */

type FileRow = {
  filename: string;
  content: string;
  sha: string;
  metadata: string | null;
  weight: number;
  created_at: number;
  updated_at: number;
}

type SectionRow = {
  id: number;
  filename: string;
  content: string;
  level: number;
  order_index: number;
  section_slug: string;
  start_line: number;
  weight: number;
}

type DatasetRow = {
  dataset_id: string;
  org_id: string;
  primary_region: string;
  do_region: string;
  replica_regions: string | null;
  created_at: number;
  updated_at: number;
}

type SearchResultRow = {
  filename: string;
  content: string;
  section_slug: string;
  start_line: number;
  snippet: string;
  base_score: number;
  section_weight: number;
  file_weight: number;
  metadata: string | null;
  score: number;
}

/* ---------- ENV interface ---------------------------- */

interface Env {
  DATASETS: DurableObjectNamespace;
  ASSETS: Fetcher;
  EYECREST_PUBLIC_KEY: string; // RSA public key in PEM format
  EYECREST_KV: KVNamespace;
}

/* ======================================================================
   Schemas for API validation
   ==================================================================== */

const DatasetIdSchema = z.string()
  .regex(/^[a-zA-Z0-9_-]+$/, 'Dataset ID must only contain alphanumeric characters, hyphens, and underscores')
  .max(400, 'Dataset ID must not exceed 400 characters');

const FileSchema = z.object({
  filename: z.string()
    .regex(/^[a-zA-Z0-9!_.*'()\-\/]+$/, 'Filename must only contain alphanumeric characters and safe special characters (!_.*\'()-/)')
    .max(500, 'Filename must not exceed 500 characters')
    .describe('Full file path without leading slash, including extension (md or mdx)'),
  content: z.string().describe('Raw file content'),
  metadata: z.any().optional().describe('Optional user-provided metadata for the file (JSON object)'),
  weight: z.number().optional().default(1.0).describe('Optional weight for ranking in search results (default: 1.0)'),
});

type FileSchema = z.infer<typeof FileSchema>;

const UpsertFilesRequestSchema = z.object({
  files: z.array(FileSchema).describe('List of files to ingest and auto-chunk'),
  waitForReplication: z.boolean().optional().default(true).describe('Whether to wait for replication to complete (default: true)')
});

const DeleteFilesSchema = z.object({
  filenames: z.array(z.string()).describe('List of full file paths to delete'),
  waitForReplication: z.boolean().optional().default(true).describe('Whether to wait for replication to complete (default: true)')
});

const UpsertDatasetRequestSchema = z.object({
  primaryRegion: z.enum(VALID_REGIONS)
    .optional()
    .describe('Durable Object region where the dataset will be created (immutable after creation). If not provided, uses closest region.'),
  replicaRegions: z.array(z.enum(VALID_REGIONS))
    .optional()
    .describe('Additional regions where the dataset should be replicated'),
  waitForReplication: z.boolean()
    .optional()
    .default(true)
    .describe('Whether to wait for data sync to complete when adding new replicas (default: true)'),
});

const GetFileContentsQuerySchema = z.object({
  showLineNumbers: z.string()
    .optional()
    .default('false')
    .describe('Whether to prefix each line with its line number. Values: "true", "false", or empty string (treated as true)'),
  start: z.coerce.number().int().positive().optional().describe('Start line number (1-based)'),
  end: z.coerce.number().int().positive().optional().describe('End line number (inclusive)'),
});

const SearchSectionsQuerySchema = z.object({
  query: z.string().describe('Full-text search query'),
  page: z.coerce.number().int().nonnegative().default(0).describe('Zero-based page number'),
  perPage: z.coerce.number().int().positive().default(20).describe('Number of results per page'),
  maxChunksPerFile: z.coerce.number().int().positive().default(5).describe('Maximum sections returned per file'),
  snippetLength: z.coerce.number().int().positive().max(500).default(300).describe('Maximum length of snippet (max 500)'),
});

const SearchSectionsResponseSchema = z.object({
  results: z.array(
    z.object({
      filename: z.string().describe('Source file path'),
      sectionSlug: z.string().describe('URL-friendly slug of the section heading'),
      snippet: z.string().describe('Raw markdown excerpt'),
      cleanedSnippet: z.string().describe('Cleaned text excerpt without markdown syntax'),
      score: z.number().describe('Relevance score'),
      startLine: z.number().describe('Line number where section starts'),
      metadata: z.any().optional().describe('File metadata if available'),
    })
  ),
  hasNextPage: z.boolean().describe('Whether there are more results on the next page'),
  page: z.number().int().describe('Current page'),
  perPage: z.number().int().describe('Results per page'),
  region: z.string().describe('Durable Object region where search was executed'),
});

// Export types for SDK use
export type EyecrestFile = z.input<typeof FileSchema>;
export type DeleteFilesRequest = z.infer<typeof DeleteFilesSchema>;
export type UpsertDatasetRequest = z.infer<typeof UpsertDatasetRequestSchema>;
export type GetFileContentsQuery = z.infer<typeof GetFileContentsQuerySchema>;
export type SearchSectionsQuery = z.infer<typeof SearchSectionsQuerySchema>;
export type SearchSectionsResponse = z.infer<typeof SearchSectionsResponseSchema>;

/* ======================================================================
   Helper function removed - use getDurableObjectId instead
   ==================================================================== */

/* ======================================================================
   Durable Object: per‑dataset file storage
   ==================================================================== */
export class Datasets extends DurableObject {
  private sql: SqlStorage;
  private datasetId?: string;
  private doRegion?: DurableObjectRegion;
  private replicaRegions: DurableObjectRegion[] = [];
  protected env: Env;
  private state: DurableObjectState;

  constructor(state: DurableObjectState, env: Env) {
    super(state, env);
    this.sql = state.storage.sql;
    this.env = env;
    this.state = state;

    // DO region and datasetId will be set via loadDatasetInfo or upsertDataset
    // We don't try to extract from state.id as it's a random string

    /* database schema */
    this.sql.exec(`
      -- Files table stores the raw file content
      CREATE TABLE IF NOT EXISTS files (
        filename       TEXT PRIMARY KEY,
        content        TEXT,
        sha            TEXT,
        metadata       TEXT,
        weight         REAL DEFAULT 1.0,
        created_at     INTEGER,
        updated_at     INTEGER
      );

      -- Sections table stores parsed sections from MD/MDX files
      CREATE TABLE IF NOT EXISTS sections (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        filename      TEXT NOT NULL,
        content       TEXT NOT NULL,  -- Full markdown content including heading
        level         INTEGER NOT NULL,
        order_index   INTEGER NOT NULL,
        section_slug  TEXT NOT NULL,
        start_line    INTEGER NOT NULL,
        weight        REAL DEFAULT 1.0,
        FOREIGN KEY (filename) REFERENCES files(filename) ON DELETE CASCADE
      );

      -- Full-text search index for sections
      -- Using 'porter' tokenizer for better search results:
      -- 1. Stemming: Porter reduces words to their root forms (e.g., "running" → "run", "components" → "component")
      --    This helps match different forms of the same word in MDX/MD documentation
      -- 2. Case-insensitive: Automatically handles case variations common in code/docs
      -- 3. Language-aware: Better than 'unicode61' for English technical documentation
      -- 4. Performance: More efficient than trigram tokenizer for typical search queries
      -- 5. MDX/JSX friendly: Treats JSX tags and code snippets as regular tokens, indexing their content
      CREATE VIRTUAL TABLE IF NOT EXISTS sections_fts
        USING fts5(filename, section_slug, content, tokenize = 'porter');

      -- FTS5 vocabulary table to access all indexed tokens
      -- This provides access to the internal tokenizer output and term statistics
      -- 'row' type gives us one row per unique token across all documents
      CREATE VIRTUAL TABLE IF NOT EXISTS sections_fts_vocab
        USING fts5vocab(sections_fts, 'row');

      -- Metadata table
      CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, val TEXT);

      -- Datasets table to track ownership
      CREATE TABLE IF NOT EXISTS datasets (
        dataset_id    TEXT PRIMARY KEY,
        org_id        TEXT NOT NULL,
        primary_region TEXT NOT NULL,
        do_region     TEXT NOT NULL,
        replica_regions TEXT,  -- JSON array of replica regions
        created_at    INTEGER NOT NULL,
        updated_at    INTEGER NOT NULL
      );
    `);
  }

  /* ---------- Private Methods ------------- */

  private async loadDatasetInfo(datasetId: string): Promise<void> {
    const rows = [...this.sql.exec("SELECT * FROM datasets WHERE dataset_id = ?", datasetId)] as DatasetRow[];
    if (rows.length > 0) {
      const row = rows[0];
      this.datasetId = row.dataset_id;
      this.doRegion = row.do_region as DurableObjectRegion;

      if (row.replica_regions) {
        this.replicaRegions = JSON.parse(row.replica_regions);
      }
    } else {
      throw new Error(`Dataset ${datasetId} not found in database`);
    }
  }

  private isPrimary(): boolean {
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set before checking primary status');
    }
    // Check if this DO's region matches the primary region in the database
    const rows = [...this.sql.exec("SELECT primary_region FROM datasets WHERE dataset_id = ?", this.datasetId)] as Pick<DatasetRow, 'primary_region'>[];
    return rows.length > 0 && rows[0].primary_region === this.doRegion;
  }

  private getReplicaStubs(datasetId: string): Array<{ region: DurableObjectRegion; stub: any }> {
    if (!this.isPrimary() || this.replicaRegions.length === 0) {
      return [];
    }

    return this.replicaRegions.map(region => {
      const doId = getDurableObjectId({ datasetId, region });
      const id = this.env.DATASETS.idFromName(doId);
      const stub = this.env.DATASETS.get(id, { locationHint: region });
      return { region, stub };
    });
  }

  /* ---------- API Methods ------------- */

  async upsertDataset({ datasetId, orgId, region, isPrimary, replicaRegions, waitForReplication = true }: {
    datasetId: string;
    orgId: string;
    region: string;
    isPrimary: boolean;
    replicaRegions?: DurableObjectRegion[];
    waitForReplication?: boolean;
  }): Promise<void> {
    // Set the DO region if not already set
    if (!this.doRegion) {
      this.doRegion = region as DurableObjectRegion;
    } else if (this.doRegion !== region) {
      throw new Error(`Region mismatch: DO is in ${this.doRegion} but request says ${region}`);
    }

    this.datasetId = datasetId;

    // Check if dataset already exists in SQL
    const datasetRows = [...this.sql.exec("SELECT org_id, primary_region, replica_regions FROM datasets WHERE dataset_id = ?", datasetId)] as Pick<DatasetRow, 'org_id' | 'primary_region' | 'replica_regions'>[];

    const isExistingDataset = datasetRows.length > 0;
    let existingReplicaRegions: DurableObjectRegion[] = [];

    if (isExistingDataset) {
      const existingOrgId = datasetRows[0].org_id;
      const existingRegion = datasetRows[0].primary_region;

      // Verify ownership
      if (existingOrgId !== orgId) {
        throw new Error(`Dataset ${datasetId} already exists and belongs to organization ${existingOrgId}`);
      }

      // Verify region hasn't changed (should match what's in KV)
      if (existingRegion !== region) {
        throw new Error(`Internal error: Region mismatch for dataset ${datasetId}. SQL: ${existingRegion}, expected: ${region}`);
      }

      // Parse existing replica regions
      if (datasetRows[0].replica_regions) {
        existingReplicaRegions = JSON.parse(datasetRows[0].replica_regions);
      }
    }

    // Update replica regions
    if (replicaRegions) {
      this.replicaRegions = replicaRegions;
    }

    if (!isExistingDataset) {
      // Create new dataset in SQL
      const now = Date.now();
      const replicaRegionsJson = replicaRegions ? JSON.stringify(replicaRegions) : null;
      const primaryRegion = isPrimary ? this.doRegion : region; // If we're primary, we are the primary region

      this.sql.exec(
        "INSERT INTO datasets (dataset_id, org_id, primary_region, do_region, replica_regions, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        datasetId, orgId, primaryRegion, this.doRegion, replicaRegionsJson, now, now
      );
    } else if (replicaRegions && isPrimary) {
      // Update replica regions if they've changed
      const now = Date.now();
      const replicaRegionsJson = JSON.stringify(replicaRegions);
      this.sql.exec(
        "UPDATE datasets SET replica_regions = ?, updated_at = ? WHERE dataset_id = ?",
        replicaRegionsJson, now, datasetId
      );
    }

    // If this is the primary and we have replica regions, create/update replica DOs
    if (isPrimary && replicaRegions && replicaRegions.length > 0) {
      // Determine which replicas are new (not in existingReplicaRegions)
      const newReplicas = replicaRegions.filter(
        replicaRegion => replicaRegion !== this.doRegion && !existingReplicaRegions.includes(replicaRegion)
      );

      // Check if we have any existing data that needs to be synced
      const fileCount = isExistingDataset ? [...this.sql.exec<{count: number}>("SELECT COUNT(*) as count FROM files")][0]?.count || 0 : 0;
      const hasData = fileCount > 0;

      // Create/update replicas
      const replicaPromise = Promise.all(
        replicaRegions
          .filter(replicaRegion => replicaRegion !== this.doRegion)
          .map(async replicaRegion => {
            try {
              const replicaDoId = getDurableObjectId({ datasetId, region: replicaRegion });
              const replicaId = this.env.DATASETS.idFromName(replicaDoId);
              const replicaStub = this.env.DATASETS.get(replicaId, { locationHint: replicaRegion }) as any as Datasets;

              // Create the replica DO
              await replicaStub.upsertDataset({
                datasetId,
                orgId,
                region: replicaRegion,
                isPrimary: false,
                replicaRegions: [] // Replicas don't need to know about other replicas
              });

              // If this is a new replica and we have existing data, sync it
              if (newReplicas.includes(replicaRegion) && hasData) {
                console.log(`[upsert-dataset] Syncing existing data to new replica in ${replicaRegion}`);
                // Pass the primary region so replica can create the stub
                await replicaStub.syncFromPrimary({ datasetId, orgId, primaryRegion: this.doRegion! });
              }
            } catch (error) {
              console.error(`Failed to create/sync replica in ${replicaRegion}:`, error);
            }
          })
      ).catch(error => {
        console.error('Failed to create/sync replicas:', error);
      });

      // If waitForReplication is false, use waitUntil for fire-and-forget
      // If true, await the promise to ensure sync completes before returning
      if (waitForReplication) {
        await replicaPromise;
      } else {
        this.state.waitUntil(replicaPromise);
      }
    }
  }

  async updateReplicaRegions({ datasetId, replicaRegions }: { datasetId: string; replicaRegions: DurableObjectRegion[] }): Promise<void> {
    this.replicaRegions = replicaRegions;
    const replicaRegionsJson = JSON.stringify(replicaRegions);
    const now = Date.now();

    this.sql.exec(
      "UPDATE datasets SET replica_regions = ?, updated_at = ? WHERE dataset_id = ?",
      replicaRegionsJson, now, datasetId
    );
  }

  async upsertFiles({ datasetId, orgId, files, region, waitForReplication = true }: { datasetId: string; orgId: string; files: FileSchema[]; region?: string; waitForReplication?: boolean }): Promise<void> {
    console.log(`[upsert] Starting upsertFiles for dataset ${datasetId} with ${files.length} files`);
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Verify region matches if provided
    if (region && region !== this.doRegion) {
      throw new Error(`Region mismatch: DO is in ${this.doRegion} but request says ${region}`);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }

    const startTime = Date.now();

    // Check if dataset exists and verify ownership
    const ownershipStart = Date.now();
    const datasetRows = [...this.sql.exec("SELECT org_id, primary_region FROM datasets WHERE dataset_id = ?", datasetId)] as Pick<DatasetRow, 'org_id' | 'primary_region'>[];
    if (datasetRows.length > 0) {
      const existingOrgId = datasetRows[0].org_id;
      if (existingOrgId !== orgId) {
        throw new Error(`Unauthorized: dataset ${datasetId} belongs to organization ${existingOrgId}, but you are authenticated as ${orgId}`);
      }
    } else {
      throw new Error(`Dataset ${datasetId} not found. Please create it first using POST /v1/datasets/:datasetId`);
    }
    console.log(`[upsert] Ownership check: ${Date.now() - ownershipStart}ms`);

    // Log file names being upserted
    console.log(`[upsert] Files to upsert: ${files.map(f => f.filename).join(', ')}`);

    // Parallelize SHA computations
    const shaStart = Date.now();
    const shaComputations = await Promise.all(
      files.map(async (file) => ({
        file,
        computedSHA: await computeGitBlobSHA(file.content)
      }))
    );
    console.log(`[upsert] SHA computations (${files.length} files): ${Date.now() - shaStart}ms`);

    // Get all existing files using json_each to avoid SQLite variable limit
    const existingCheckStart = Date.now();
    const filenames = files.map(f => f.filename);
    const filenamesJson = JSON.stringify(filenames);

    let existingMap: Map<string, string>;

    const existingFiles = [...this.sql.exec(
      `SELECT filename, sha FROM files WHERE filename IN (SELECT value FROM json_each(?))`,
      filenamesJson
    )] as Pick<FileRow, 'filename' | 'sha'>[];

    existingMap = new Map(existingFiles.map(row => [row.filename, row.sha]));

    console.log(`[upsert] Existing files check (${filenames.length} files): ${Date.now() - existingCheckStart}ms`);

    // Process each file
    let processedCount = 0;
    let skippedCount = 0;
    const processingStart = Date.now();

    for (const { file, computedSHA } of shaComputations) {
      const now = Date.now();

      // Ignore user-provided SHA - always use computed SHA

      // Check if file exists and needs update based on SHA
      const existingSHA = existingMap.get(file.filename);
      const isUpdate = existingSHA !== undefined;

      // Skip update if SHA hasn't changed
      if (isUpdate && existingSHA === computedSHA) {
        skippedCount++;
        continue;
      }

      processedCount++;

      // Delete existing sections for this file
      this.sql.exec("DELETE FROM sections WHERE filename = ?", file.filename);
      this.sql.exec("DELETE FROM sections_fts WHERE filename = ?", file.filename);

      // Upsert file with SHA, metadata, and weight
      const metadataJson = file.metadata ? JSON.stringify(file.metadata) : null;
      const fileWeight = file.weight ?? 1.0;
      if (isUpdate) {
        this.sql.exec("UPDATE files SET content = ?, sha = ?, metadata = ?, weight = ?, updated_at = ? WHERE filename = ?",
          file.content, computedSHA, metadataJson, fileWeight, now, file.filename);
      } else {
        this.sql.exec("INSERT INTO files (filename, content, sha, metadata, weight, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
          file.filename, file.content, computedSHA, metadataJson, fileWeight, now, now);
      }

      // Parse and store sections if it's a markdown file
      if (isSupportedMarkdownFile(file.filename)) {
        const parseStart = Date.now();
        const parsed = parseMarkdownIntoSections(file.content);
        const slugger = new Slugger();

        // Log files with many sections
        if (parsed.sections.length > 50) {
          console.log(`[upsert] File ${file.filename} has ${parsed.sections.length} sections`);
        }

        // Batch insert sections for better performance
        if (parsed.sections.length > 0) {
          // Insert all sections using json_each to avoid SQLite variable limit
          const sectionsData: any[] = [];
          const ftsData: any[] = [];

          for (const section of parsed.sections) {
            // Use section weight if defined, otherwise inherit file weight
            const sectionWeight = section.weight ?? fileWeight;

            sectionsData.push({
              filename: file.filename,
              content: section.content,
              level: section.level,
              order_index: section.orderIndex,
              section_slug: section.headingSlug,
              start_line: section.startLine,
              weight: sectionWeight
            });

            ftsData.push({
              filename: file.filename,
              section_slug: section.headingSlug,
              content: section.content
            });
          }

          // Insert sections using json_each
          const sectionsJson = JSON.stringify(sectionsData);
          this.sql.exec(`
            INSERT INTO sections (filename, content, level, order_index, section_slug, start_line, weight)
            SELECT
              json_extract(value, '$.filename'),
              json_extract(value, '$.content'),
              json_extract(value, '$.level'),
              json_extract(value, '$.order_index'),
              json_extract(value, '$.section_slug'),
              json_extract(value, '$.start_line'),
              json_extract(value, '$.weight')
            FROM json_each(?)
          `, sectionsJson);

          // Insert FTS data using json_each
          const ftsJson = JSON.stringify(ftsData);
          this.sql.exec(`
            INSERT INTO sections_fts (filename, section_slug, content)
            SELECT
              json_extract(value, '$.filename'),
              json_extract(value, '$.section_slug'),
              json_extract(value, '$.content')
            FROM json_each(?)
          `, ftsJson);
        }

        if (parsed.sections.length > 10) {
          console.log(`[upsert] Parsed ${file.filename} (${parsed.sections.length} sections): ${Date.now() - parseStart}ms`);
        }
      }
    }

    console.log(`[upsert] Processing files (${processedCount} processed, ${skippedCount} skipped): ${Date.now() - processingStart}ms`);
    console.log(`[upsert] Total time: ${Date.now() - startTime}ms`);
    console.log(`[upsert] Completed upsertFiles for dataset ${datasetId}`);

    // Forward writes to replicas if this is the primary
    if (this.isPrimary() && processedCount > 0) {
      const replicas = this.getReplicaStubs(datasetId);
      if (replicas.length > 0) {
        console.log(`[upsert] Forwarding to ${replicas.length} replicas`);

        const replicationPromise = Promise.all(
          replicas.map(async ({ region, stub }) => {
            try {
              await stub.upsertFiles({ datasetId, orgId, files, region, waitForReplication: false });
            } catch (error) {
              console.error(`[upsert] Failed to replicate to ${region}:`, error);
              // Continue even if some replicas fail
            }
          })
        );

        if (waitForReplication) {
          // Wait for replication to complete
          await replicationPromise.catch(error => {
            console.error('Failed to forward writes to replicas:', error);
          });
        } else {
          // Fire and forget using waitUntil
          this.state.waitUntil(
            replicationPromise.catch(error => {
              console.error('Failed to forward writes to replicas:', error);
            })
          );
        }
      }
    }
  }

  async deleteFiles({ datasetId, orgId, filenames, region, waitForReplication = true }: { datasetId: string; orgId: string; filenames: string[]; region?: string; waitForReplication?: boolean }): Promise<void> {
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Verify region matches if provided
    if (region && region !== this.doRegion) {
      throw new Error(`Region mismatch: DO is in ${this.doRegion} but request says ${region}`);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }


    // Verify ownership
    await this.verifyDatasetOwnership(datasetId, orgId);

    for (const filename of filenames) {
      // Delete file and its sections (CASCADE will handle sections table)
      this.sql.exec("DELETE FROM files WHERE filename = ?", filename);
      this.sql.exec("DELETE FROM sections_fts WHERE filename = ?", filename);
    }

    // Forward deletes to replicas if this is the primary
    if (this.isPrimary() && filenames.length > 0) {
      const replicas = this.getReplicaStubs(datasetId);
      if (replicas.length > 0) {
        console.log(`[delete] Forwarding to ${replicas.length} replicas`);

        const replicationPromise = Promise.all(
          replicas.map(async ({ region, stub }) => {
            try {
              await stub.deleteFiles({ datasetId, orgId, filenames, region, waitForReplication: false });
            } catch (error) {
              console.error(`[delete] Failed to replicate to ${region}:`, error);
              // Continue even if some replicas fail
            }
          })
        );

        if (waitForReplication) {
          // Wait for replication to complete
          await replicationPromise.catch(error => {
            console.error('Failed to forward deletes to replicas:', error);
          });
        } else {
          // Fire and forget using waitUntil
          this.state.waitUntil(
            replicationPromise.catch(error => {
              console.error('Failed to forward deletes to replicas:', error);
            })
          );
        }
      }
    }
  }

  async getFileContents({
    datasetId,
    orgId,
    filePath,
    showLineNumbers,
    start,
    end,
    region
  }: {
    datasetId: string;
    orgId: string;
    filePath: string;
    showLineNumbers?: boolean;
    start?: number;
    end?: number;
    region?: string;
  }): Promise<{ content: string; sha: string; metadata?: any }> {
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Verify region matches if provided
    if (region && region !== this.doRegion) {
      throw new Error(`Region mismatch: DO is in ${this.doRegion} but request says ${region}`);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }

    // Verify ownership
    await this.verifyDatasetOwnership(datasetId, orgId);

    const results = [...this.sql.exec<Pick<FileRow, 'content' | 'sha' | 'metadata'>>("SELECT content, sha, metadata FROM files WHERE filename = ?", filePath)];
    const row = results.length > 0 ? results[0] : null;

    if (!row) {
      throw new Error(`File not found: ${filePath} in dataset ${datasetId}`);
    }

    let content = row.content;
    const sha = row.sha;
    const metadata = row.metadata ? JSON.parse(row.metadata) : undefined;

    // Apply line formatting if any formatting options are specified
    if (showLineNumbers || start !== undefined || end !== undefined) {
      content = formatFileWithLines(content, showLineNumbers || false, start, end);
    }

    return { content, sha, metadata };
  }

  async searchSections({
    datasetId,
    orgId,
    query,
    page = 0,
    perPage = 20,
    maxChunksPerFile = 5,
    snippetLength = 300,
    region
  }: {
    datasetId: string;
    orgId: string;
    query: string;
    page?: number;
    perPage?: number;
    maxChunksPerFile?: number;
    snippetLength?: number;
    region?: string;
  }): Promise<{
    results: Array<{
      filename: string;
      sectionSlug: string;
      snippet: string;
      cleanedSnippet: string;
      score: number;
      startLine: number;
      metadata?: any;
    }>;
    hasNextPage: boolean;
    page: number;
    perPage: number;
    region: string;
  }> {
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Verify region matches if provided
    if (region && region !== this.doRegion) {
      throw new Error(`Region mismatch: DO is in ${this.doRegion} but request says ${region}`);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }

    // Verify ownership
    await this.verifyDatasetOwnership(datasetId, orgId);

    const offset = page * perPage;

    // Search in sections using FTS
    const searchQuery = decodeURIComponent(query);

    // Get paginated results with section details
    // Fetch one extra result to determine if there's a next page
    // Join using section_slug for simpler and more performant matching
    // Apply weights to BM25 score for better ranking
    const rows = [...this.sql.exec<SearchResultRow>(
      `WITH matched_sections AS (
        SELECT filename, section_slug
        FROM sections_fts
        WHERE sections_fts.content MATCH ?
        ORDER BY bm25(sections_fts)
        LIMIT 300
      )
      SELECT
        sections.filename,
        sections.content,
        sections.section_slug,
        sections.start_line,
        snippet(sections_fts, 2, '', '', '', ?) as snippet,
        bm25(sections_fts) as base_score,
        sections.weight as section_weight,
        files.weight as file_weight,
        files.metadata,
        -- Combined score with logarithmic weight normalization
        -- BM25 is the primary signal, weights provide minor boosts
        (bm25(sections_fts) * (1.0 + LOG(sections.weight) * 0.1) * (1.0 + LOG(files.weight) * 0.1)) as score
      FROM matched_sections
      JOIN sections_fts ON sections_fts.filename = matched_sections.filename
        AND sections_fts.section_slug = matched_sections.section_slug
      JOIN sections ON sections.filename = matched_sections.filename
        AND sections.section_slug = matched_sections.section_slug
      JOIN files ON sections.filename = files.filename
      WHERE sections_fts.content MATCH ?
      ORDER BY score
      LIMIT ? OFFSET ?`,
      searchQuery,
      snippetLength,
      searchQuery,
      perPage + 1, // Fetch one extra to check for next page
      offset
    )];

    // Check if there are more results
    const hasNextPage = rows.length > perPage;

    // Remove the extra result if present
    if (hasNextPage) {
      rows.pop();
    }

    // Group results by filename and limit per file
    const fileGroups: Record<string, any[]> = {};

    for (const row of rows) {
      const filename = row.filename;
      if (!fileGroups[filename]) {
        fileGroups[filename] = [];
      }

      if (fileGroups[filename].length < maxChunksPerFile) {
        const metadata = row.metadata ? JSON.parse(row.metadata) : undefined;
        const rawSnippet = row.snippet;
        fileGroups[filename].push({
          filename,
          sectionSlug: row.section_slug,
          snippet: rawSnippet,
          cleanedSnippet: cleanMarkdownContent(rawSnippet),
          score: row.score,
          startLine: row.start_line,
          metadata,
        });
      }
    }

    // Flatten results
    const results = Object.values(fileGroups).flat();

    return {
      results,
      hasNextPage,
      page,
      perPage,
      region: this.doRegion!,
    };
  }

  async searchSectionsText({
    datasetId,
    orgId,
    query,
    page = 0,
    perPage = 20,
    maxChunksPerFile = 5,
    snippetLength = 300,
    region
  }: {
    datasetId: string;
    orgId: string;
    query: string;
    page?: number;
    perPage?: number;
    maxChunksPerFile?: number;
    snippetLength?: number;
    region: string;
  }): Promise<string> {
    const data = await this.searchSections({ datasetId, orgId, query, page, perPage, maxChunksPerFile, snippetLength, region });

    // Convert to markdown format with headings and URLs
    let textResult = data.results
      .map((result) => {
        // Extract heading from snippet if present
        const headingMatch = result.snippet.match(/^(#{1,6})\s+(.+)$/m);
        const heading = headingMatch ? headingMatch[2] : '';
        const level = headingMatch ? headingMatch[1].length : 2;
        const headingPrefix = '#'.repeat(Math.min(level + 1, 6)); // Offset by 1 to show hierarchy

        // Build URL to read specific line
        const baseUrl = `/v1/datasets/${datasetId}/files/${result.filename}`;
        const lineUrl = result.startLine ? `${baseUrl}?start=${result.startLine}` : baseUrl;

        return `${headingPrefix} ${heading}\n\n[${result.filename}:${result.startLine || '1'}](${lineUrl})\n\n${result.snippet}\n`;
      })
      .join('\n---\n\n');

    // Add pagination info if there's a next page
    if (data.hasNextPage) {
      textResult += `\n\n---\n\n*More results available on page ${data.page + 1}*`;
    }

    return textResult;
  }

  private async verifyDatasetOwnership(datasetId: string, orgId: string): Promise<void> {
    const datasetRows = [...this.sql.exec<Pick<DatasetRow, 'org_id'>>("SELECT org_id FROM datasets WHERE dataset_id = ?", datasetId)];
    if (datasetRows.length === 0) {
      throw new Error(`Dataset not found: ${datasetId}. This dataset has never been created or all files have been deleted.`);
    }

    const existingOrgId = datasetRows[0].org_id;
    if (existingOrgId !== orgId) {
      throw new Error(`Unauthorized: dataset ${datasetId} belongs to organization ${existingOrgId}, but you are authenticated as ${orgId}`);
    }
  }

  async deleteDataset({ datasetId, orgId }: { datasetId: string; orgId: string }): Promise<void> {
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }

    // Verify ownership
    await this.verifyDatasetOwnership(datasetId, orgId);

    // Delete all data (cascades will handle sections and FTS)
    this.sql.exec("DELETE FROM files WHERE filename IN (SELECT filename FROM files)");
    this.sql.exec("DELETE FROM sections_fts");
    this.sql.exec("DELETE FROM datasets WHERE dataset_id = ?", datasetId);

    // If this is the primary, notify replicas to delete themselves
    if (this.isPrimary()) {
      const replicas = this.getReplicaStubs(datasetId);
      if (replicas.length > 0) {
        console.log(`[delete-dataset] Notifying ${replicas.length} replicas to delete`);

        // Use waitUntil for fire-and-forget deletion of replicas
        this.state.waitUntil(
          Promise.all(
            replicas.map(async ({ region, stub }) => {
              try {
                await stub.deleteDataset({ datasetId, orgId });
              } catch (error) {
                console.error(`[delete-dataset] Failed to delete replica in ${region}:`, error);
              }
            })
          ).catch(error => {
            console.error('Failed to delete dataset replicas:', error);
          })
        );
      }
    }
  }

  async getAllData({ datasetId, orgId }: { datasetId: string; orgId: string }): Promise<FileSchema[]> {
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }

    // Verify ownership
    await this.verifyDatasetOwnership(datasetId, orgId);

    // Get all files with their content and metadata
    const files = [...this.sql.exec<FileRow>(
      "SELECT filename, content, sha, metadata, weight FROM files ORDER BY filename"
    )];

    // Convert to FileSchema format
    return files.map(file => ({
      filename: file.filename,
      content: file.content,
      metadata: file.metadata ? JSON.parse(file.metadata) : undefined,
      weight: file.weight
    }));
  }

  async syncFromPrimary({ datasetId, orgId, primaryRegion }: {
    datasetId: string;
    orgId: string;
    primaryRegion: DurableObjectRegion;
  }): Promise<void> {
    // This method is called on a replica to sync data from the primary
    console.log(`[sync-from-primary] Starting sync for dataset ${datasetId} in region ${this.doRegion}`);

    try {
      // Create primary stub from ID
      const primaryDoId = getDurableObjectId({ datasetId, region: primaryRegion });
      const primaryId = this.env.DATASETS.idFromName(primaryDoId);
      const primaryStub = this.env.DATASETS.get(primaryId, { locationHint: primaryRegion }) as any as Datasets;

      // Get all data from primary
      const files = await primaryStub.getAllData({ datasetId, orgId });
      console.log(`[sync-from-primary] Received ${files.length} files from primary`);

      if (files.length === 0) {
        console.log(`[sync-from-primary] No files to sync`);
        return;
      }

      // Use upsertFiles to import all data
      // This will handle all the parsing, sectioning, and indexing
      await this.upsertFiles({
        datasetId,
        orgId,
        files,
        region: this.doRegion,
        waitForReplication: false // Don't replicate from replica
      });

      console.log(`[sync-from-primary] Successfully synced ${files.length} files`);
    } catch (error) {
      console.error(`[sync-from-primary] Failed to sync data:`, error);
      throw new Error(`Failed to sync data from primary: ${error.message}`);
    }
  }

  async getTokens({ datasetId, orgId }: { datasetId: string; orgId: string }): Promise<string[]> {
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }

    // Verify ownership
    await this.verifyDatasetOwnership(datasetId, orgId);

    // Query the vocab table to get all unique tokens
    // The vocab table returns: term, doc (count of documents), cnt (total occurrences)
    // We only need the 'term' column for the list of tokens
    const tokens = [...this.sql.exec<{ term: string }>(
      "SELECT term FROM sections_fts_vocab ORDER BY term"
    )];

    // Extract just the token strings
    return tokens.map(row => row.term);
  }

  async getDatasetSize({ datasetId, orgId }: { datasetId: string; orgId: string }): Promise<{
    totalSizeBytes: number;
    uploadedContentSizeBytes: number;
    fileCount: number;
    sectionCount: number;
    breakdown: {
      databaseSizeBytes: number;
      contentSizeBytes: number;
      metadataSizeBytes: number;
    };
  }> {
    // Load dataset info if not already loaded
    if (!this.datasetId || this.datasetId !== datasetId) {
      await this.loadDatasetInfo(datasetId);
    }

    // Validate we have required fields
    if (!this.doRegion || !this.datasetId) {
      throw new Error('DO region and datasetId must be set');
    }

    // Verify ownership
    await this.verifyDatasetOwnership(datasetId, orgId);

    // Note: PRAGMA commands are not allowed in Cloudflare Durable Objects due to SQLITE_AUTH restrictions
    // We'll calculate content-based sizes instead

    // Get file and section counts
    const fileCountResult = [...this.sql.exec<{ count: number }>("SELECT COUNT(*) as count FROM files")];
    const sectionCountResult = [...this.sql.exec<{ count: number }>("SELECT COUNT(*) as count FROM sections")];
    const fileCount = fileCountResult[0]?.count || 0;
    const sectionCount = sectionCountResult[0]?.count || 0;

    // Calculate content size (sum of all file contents)
    // Using LENGTH with CAST to BLOB ensures we get byte count, not character count
    const contentSizeResult = [...this.sql.exec<{ total_size: number }>(
      "SELECT COALESCE(SUM(LENGTH(CAST(content AS BLOB))), 0) as total_size FROM files"
    )];
    const contentSizeBytes = contentSizeResult[0]?.total_size || 0;

    // Calculate metadata size
    const metadataSizeResult = [...this.sql.exec<{ total_size: number }>(
      "SELECT COALESCE(SUM(LENGTH(CAST(metadata AS BLOB))), 0) as total_size FROM files WHERE metadata IS NOT NULL"
    )];
    const metadataSizeBytes = metadataSizeResult[0]?.total_size || 0;

    // Calculate section content size
    const sectionSizeResult = [...this.sql.exec<{ total_size: number }>(
      "SELECT COALESCE(SUM(LENGTH(CAST(content AS BLOB))), 0) as total_size FROM sections"
    )];
    const sectionSizeBytes = sectionSizeResult[0]?.total_size || 0;

    // Calculate total size (content + metadata + sections)
    // This is an approximation since we can't access the actual database file size
    const totalSizeBytes = contentSizeBytes + metadataSizeBytes + sectionSizeBytes;

    return {
      totalSizeBytes,
      uploadedContentSizeBytes: contentSizeBytes, // This is the actual user-uploaded text data
      fileCount,
      sectionCount,
      breakdown: {
        databaseSizeBytes: totalSizeBytes, // Using total as approximation
        contentSizeBytes,
        metadataSizeBytes
      }
    };
  }


}

/* ======================================================================
   JWT Verification
   ==================================================================== */

interface JWTPayload {
  orgId: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

async function verifyJWT(token: string, publicKey: string): Promise<JWTPayload> {
  try {
    // Import the public key
    const key = await importSPKI(publicKey, 'RS256');

    // Verify the JWT
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['RS256']
    });

    // Check if orgId is present
    if (!payload.orgId || typeof payload.orgId !== 'string') {
      throw new Error('JWT missing required orgId claim');
    }

    return payload as JWTPayload;
  } catch (error) {
    throw new Error(`JWT verification failed: ${error.message}`);
  }
}

/* ======================================================================
   Main Spiceflow App
   ==================================================================== */

const app = new Spiceflow({disableSuperJsonUnlessRpc: true})
  .state("env", {} as Env)
  .state("ctx", {} as ExecutionContext)
  .state("orgId", null as string | null)
  .use(cors())
  .use(openapi({ path: "/openapi.json" }))

  // JWT Authorization Middleware for API routes
  .use(async (context) => {
    // Skip auth for non-API routes
    const url = new URL(context.request.url);
    if (!url.pathname.startsWith('/v1/')) {
      return;
    }

    // Extract JWT from Authorization header
    const authHeader = context.request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing or invalid Authorization header' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      // Verify JWT and extract orgId
      const payload = await verifyJWT(token, context.state.env.EYECREST_PUBLIC_KEY);
      context.state.orgId = payload.orgId;
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  })

  // 1) Create or verify a dataset with explicit region (upsert)
  .route({
    method: 'POST',
    path: '/v1/datasets/:datasetId',
    params: z.object({ datasetId: DatasetIdSchema }),
    request: UpsertDatasetRequestSchema,
    response: z.void(),
    async handler({ request, params, state }) {
      const { primaryRegion, replicaRegions, waitForReplication = true } = await request.json();
      const { datasetId } = params;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Check if dataset already exists
      const existingConfig = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (existingConfig && primaryRegion && existingConfig.primaryRegion !== primaryRegion) {
        throw new Error(`Cannot change primary region from ${existingConfig.primaryRegion} to ${primaryRegion}. Primary region is immutable.`);
      }

      // Create new config if needed
      const region = existingConfig?.primaryRegion || primaryRegion || getClosestDurableObjectRegion({
        continent: request.cf?.continent as string | undefined,
        latitude: request.cf?.latitude as number | undefined,
        longitude: request.cf?.longitude as number | undefined
      });

      const config: DatasetConfig = {
        primaryRegion: region,
        orgId,
        replicaRegions: replicaRegions || existingConfig?.replicaRegions
      };

      // Save config to KV
      await setDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId,
        config
      });

      // Create DO ID and stub with locationHint for primary
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      // Upsert dataset in primary DO (it will handle creating replicas)
      await stub.upsertDataset({
        datasetId,
        orgId,
        region,
        isPrimary: true,
        replicaRegions,
        waitForReplication
      });
    },
    openapi: { operationId: 'upsertDataset' },
  })

  // 2) Batch upsert files (auto-chunk on server based on extension)
  .route({
    method: 'PUT',
    path: '/v1/datasets/:datasetId/files',
    params: z.object({ datasetId: DatasetIdSchema }),
    request: UpsertFilesRequestSchema,
    response: z.void(),
    async handler({ request, params, state }) {
      const { files, waitForReplication = true } = await request.json();
      const { datasetId } = params;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      const region = config.primaryRegion;

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      await stub.upsertFiles({ datasetId, orgId, files, region, waitForReplication });
    },
    openapi: { operationId: 'upsertFiles' },
  })

  // 3) Delete specific files
  .route({
    method: 'DELETE',
    path: '/v1/datasets/:datasetId/files',
    params: z.object({ datasetId: DatasetIdSchema }),
    request: DeleteFilesSchema,
    response: z.void(),
    async handler({ request, params, state }) {
      const { filenames, waitForReplication = true } = await request.json();
      const { datasetId } = params;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      const region = config.primaryRegion;

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      await stub.deleteFiles({ datasetId, orgId, filenames, region, waitForReplication });
    },
    openapi: { operationId: 'deleteFiles' },
  })

  // 3b) Delete entire dataset
  .route({
    method: 'DELETE',
    path: '/v1/datasets/:datasetId',
    params: z.object({ datasetId: DatasetIdSchema }),
    response: z.void(),
    async handler({ params, state }) {
      const { datasetId } = params;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found`);
      }

      const region = config.primaryRegion;

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      // Delete from DO (which will cascade to replicas)
      await stub.deleteDataset({ datasetId, orgId });

      // Delete from KV
      await state.env.EYECREST_KV.delete(`dataset:${datasetId}`);
    },
    openapi: { operationId: 'deleteDataset' },
  })

  // 4) Get file contents with optional slicing
  .route({
    method: 'GET',
    path: '/v1/datasets/:datasetId/files/*',
    params: z.object({ datasetId: DatasetIdSchema, '*': z.string() }),
    query: GetFileContentsQuerySchema,
    response: z.object({
      content: z.string().describe('Full file content or specified line range'),
      sha: z.string().describe('SHA-1 hash of the original file content using Git blob format'),
      metadata: z.any().optional().describe('User-provided metadata for the file')
    }),
    async handler({ request, params, query, state }) {
      const { datasetId, '*': filePath } = params;
      const { showLineNumbers, start, end } = query;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      // Use closest available region for read operation
      const region = getClosestAvailableRegion({
        request: request as Request,
        primaryRegion: config.primaryRegion,
        replicaRegions: config.replicaRegions,
        isReadOperation: true
      });

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      const result = await stub.getFileContents({
        datasetId,
        orgId,
        filePath,
        showLineNumbers: showLineNumbers === 'true' || showLineNumbers === '',
        start,
        end,
        region,
      });

      return result;
    },
    openapi: { operationId: 'getFileContents' },
  })

  // 5) Search within a dataset (returns section hits as JSON)
  .route({
    method: 'GET',
    path: '/v1/datasets/:datasetId/search',
    params: z.object({ datasetId: DatasetIdSchema }),
    query: SearchSectionsQuerySchema,
    response: SearchSectionsResponseSchema,
    async handler({ request, params, query, state }) {
      const { datasetId } = params;
      const { query: q, page, perPage, maxChunksPerFile, snippetLength } = query;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      // Use closest available region for read operation
      const region = getClosestAvailableRegion({
        request: request as Request,
        primaryRegion: config.primaryRegion,
        replicaRegions: config.replicaRegions,
        isReadOperation: true
      });

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region as any }) as any as Datasets;

      const result = await stub.searchSections({
        datasetId,
        orgId,
        query: q,
        page,
        perPage,
        maxChunksPerFile,
        snippetLength,
        region,
      });

      return result;
    },
    openapi: { operationId: 'searchSections' },
  })

  // 6) Search within a dataset (returns section hits as plain text)
  .route({
    method: 'GET',
    path: '/v1/datasets/:datasetId/search.txt',
    params: z.object({ datasetId: DatasetIdSchema }),
    query: SearchSectionsQuerySchema,
    // response: z.string().describe('Plaintext search results'),
    async handler({ request, params, query, state }) {
      const { datasetId } = params;
      const { query: q, page, perPage, maxChunksPerFile, snippetLength } = query;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      // Use closest available region for read operation
      const region = getClosestAvailableRegion({
        request: request as Request,
        primaryRegion: config.primaryRegion,
        replicaRegions: config.replicaRegions,
        isReadOperation: true
      });

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region as any }) as any as Datasets;

      const result = await stub.searchSectionsText({
        datasetId,
        orgId,
        query: q,
        page,
        perPage,
        maxChunksPerFile,
        snippetLength,
        region,
      });

      return new Response(result, {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    },
    openapi: { operationId: 'searchSectionsText' },
  })

  // 7) Get all tokens (vocabulary) from the dataset
  .route({
    method: 'GET',
    path: '/v1/datasets/:datasetId/tokens',
    params: z.object({ datasetId: DatasetIdSchema }),
    response: z.object({
      tokens: z.array(z.string()).describe('All unique tokens from the full-text search index'),
      count: z.number().describe('Total number of unique tokens')
    }),
    async handler({ request, params, state }) {
      const { datasetId } = params;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      // Use closest available region for read operation
      const region = getClosestAvailableRegion({
        request: request as Request,
        primaryRegion: config.primaryRegion,
        replicaRegions: config.replicaRegions,
        isReadOperation: true
      });

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      const tokens = await stub.getTokens({ datasetId, orgId });

      return {
        tokens,
        count: tokens.length
      };
    },
    openapi: { operationId: 'getTokens' },
  })

  // 8) Get dataset size and statistics
  .route({
    method: 'GET',
    path: '/v1/datasets/:datasetId/size',
    params: z.object({ datasetId: DatasetIdSchema }),
    response: z.object({
      totalSizeBytes: z.number().describe('Total size of stored data in bytes (content + metadata + sections)'),
      uploadedContentSizeBytes: z.number().describe('Total size of user-uploaded file content in bytes (excluding duplicated sections)'),
      fileCount: z.number().describe('Number of files in the dataset'),
      sectionCount: z.number().describe('Number of sections/chunks in the dataset'),
      breakdown: z.object({
        databaseSizeBytes: z.number().describe('Estimated total size in bytes (same as totalSizeBytes)'),
        contentSizeBytes: z.number().describe('Total size of file contents in bytes'),
        metadataSizeBytes: z.number().describe('Total size of metadata in bytes')
      }).describe('Detailed breakdown of storage usage')
    }),
    async handler({ request, params, state }) {
      const { datasetId } = params;
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      // Use closest available region for read operation
      const region = getClosestAvailableRegion({
        request: request as Request,
        primaryRegion: config.primaryRegion,
        replicaRegions: config.replicaRegions,
        isReadOperation: true
      });

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      return await stub.getDatasetSize({ datasetId, orgId });
    },
    openapi: { operationId: 'getDatasetSize' },
  })

  // 9) Import files from tar.gz URL
  .route({
    method: 'POST',
    path: '/v1/datasets/:datasetId/import/tar',
    params: z.object({ datasetId: DatasetIdSchema }),
    request: z.object({
      url: z.string().url().describe('URL to tar.gz archive'),
      path: z.string().optional().describe('Optional path within archive to filter files'),
      metadata: z.any().optional().describe('Optional metadata to attach to imported files'),
      waitForReplication: z.boolean().optional().default(true).describe('Whether to wait for replication to complete (default: true)')
    }),
    response: z.object({
      filesImported: z.number().describe('Number of files imported'),
      totalSizeBytes: z.number().describe('Total size of imported files in bytes')
    }),
    async handler({ request, params, state }) {
      const { datasetId } = params;
      const { url, path, metadata, waitForReplication = true } = await request.json();
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      const region = config.primaryRegion;

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      // Process the tar archive
      const result = await processTarArchive({
        url,
        datasetId,
        orgId,
        path,
        metadata,
        region,
        stub,
        ctx: state.ctx
      });

      // Handle replication if needed
      if (waitForReplication && config.replicaRegions && config.replicaRegions.length > 0) {
        console.log(`[import-tar-worker] Triggering replication to ${config.replicaRegions.length} replicas`);
        // The primary DO will handle replication through its normal upsertFiles flow
      }

      return result;
    },
    openapi: { operationId: 'importFromTarUrl' },
  })

  // 10) Import files from GitHub repository
  .route({
    method: 'POST',
    path: '/v1/datasets/:datasetId/import/github',
    params: z.object({ datasetId: DatasetIdSchema }),
    request: z.object({
      owner: z.string().describe('GitHub repository owner/organization'),
      repo: z.string().describe('GitHub repository name'),
      branch: z.string().default('main').describe('Git branch to import from'),
      path: z.string().optional().describe('Optional path within repository to filter files'),
      metadata: z.any().optional().describe('Optional metadata to attach to imported files'),
      waitForReplication: z.boolean().optional().default(true).describe('Whether to wait for replication to complete (default: true)')
    }),
    response: z.object({
      filesImported: z.number().describe('Number of files imported'),
      totalSizeBytes: z.number().describe('Total size of imported files in bytes')
    }),
    async handler({ request, params, state }) {
      const { datasetId } = params;
      const { owner, repo, branch, path, metadata, waitForReplication = true } = await request.json();
      const orgId = state.orgId!; // Guaranteed by middleware

      // Get dataset config (must exist)
      const config = await getDatasetConfig({
        kv: state.env.EYECREST_KV,
        datasetId
      });

      if (!config) {
        throw new Error(`Dataset ${datasetId} not found. Please create the dataset first using POST /v1/datasets/${datasetId}`);
      }

      const region = config.primaryRegion;

      // Create DO ID and stub with locationHint
      const doId = getDurableObjectId({ datasetId, region });
      const id = state.env.DATASETS.idFromName(doId);
      const stub = state.env.DATASETS.get(id, { locationHint: region }) as any as Datasets;

      // Build GitHub archive URL using codeload subdomain to avoid redirect
      const url = `https://codeload.github.com/${owner}/${repo}/tar.gz/refs/heads/${branch}`;

      // Process the tar archive with GitHub-specific metadata
      const result = await processTarArchive({
        url,
        datasetId,
        orgId,
        path,
        metadata: {
          source: 'github',
          owner,
          repo,
          branch,
          ...metadata
        },
        region,
        stub,
        ctx: state.ctx
      });

      // Handle replication if needed
      if (waitForReplication && config.replicaRegions && config.replicaRegions.length > 0) {
        console.log(`[import-github-worker] Triggering replication to ${config.replicaRegions.length} replicas`);
        // The primary DO will handle replication through its normal upsertFiles flow
      }

      return result;
    },
    openapi: { operationId: 'importFromGitHub' },
  })

  // Legacy routes for MCP integration
  .route({
    path: "/sse",
    handler: ({ request, state }) =>
      MyMCP.serveSSE("/sse").fetch(request as Request, state.env, state.ctx),
  })
  .route({
    path: "/sse/message",
    handler: ({ request, state }) =>
      MyMCP.serveSSE("/sse").fetch(request as Request, state.env, state.ctx),
  })
  .route({
    path: "/mcp",
    handler: ({ request, state }) =>
      MyMCP.serve("/mcp").fetch(request as Request, state.env, state.ctx),
  });

/* ======================================================================
   MCP Integration (keeping for compatibility)
   ==================================================================== */

export class MyMCP extends McpAgent {
  server = new McpServer(
    {
      name: "Eyecrest File API",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    },
  );

  async init() {
    await addMcpTools({
      mcpServer: this.server,
      app: app,
      ignorePaths: ["/sse", "/sse/message", "/mcp"],
    });
  }
}

/* ======================================================================
   Dataset Configuration Types and Helpers
   ==================================================================== */

const DEFAULT_REGION: DurableObjectRegion = 'wnam';


interface GeolocationInfo {
  continent?: string;
  latitude?: number;
  longitude?: number;
}

/* ======================================================================
   Region Hint Calculation
   ==================================================================== */

function getClosestDurableObjectRegion({ continent, latitude, longitude }: GeolocationInfo): DurableObjectRegion {
  const lon = longitude;
  const lat = latitude;
  switch (continent) {
    case "NA": // North America
      // Western North America (wnam): Pacific coast, Rockies, Alaska
      // Eastern North America (enam): East of Rockies, down to Florida
      return lon && lon < -100
        ? "wnam" /* Western North America */
        : "enam" /* Eastern North America */;

    case "SA": // South America
      return "sam" /* South America */;

    case "EU": // Europe
      // Western Europe (weur): Ireland, UK, France, Spain, Benelux, etc.
      // Eastern Europe (eeur): Germany eastward, Poland, Balkans, etc.
      return lon && lon < 25
        ? "weur" /* Western Europe */
        : "eeur" /* Eastern Europe */;

    case "AS": // Asia
      // Middle East (me): roughly longitudes 30°E–60°E & latitudes 10°N–48°N
      // Asia-Pacific (apac): the rest of Asia (East, South, SE Asia)
      if (lon && lat && lon >= 30 && lon <= 60 && lat >= 10 && lat <= 48) {
        return "me" /* Middle East */;
      } else {
        return "apac" /* Asia-Pacific */;
      }

    case "OC": // Oceania (Australia, NZ, Pacific Islands)
      return "oc" /* Oceania */;

    case "AF": // Africa
      return "afr" /* Africa */;

    case "AN": // Antarctica (no direct DO region; choose a sensible fallback)
      return "wnam" /* Fallback to Western North America */;

    default:   // Unknown or unsupported continent
      return DEFAULT_REGION /* Fallback to default region */;
  }
}

/* ======================================================================
   Dataset Configuration Helpers
   ==================================================================== */

interface GetDatasetConfigArgs {
  kv: KVNamespace;
  datasetId: string;
}

async function getDatasetConfig({ kv, datasetId }: GetDatasetConfigArgs): Promise<DatasetConfig | null> {
  const key = `dataset:${datasetId}`;
  const configJson = await kv.get(key);

  if (!configJson) {
    return null;
  }

  return JSON.parse(configJson);
}

interface SetDatasetConfigArgs {
  kv: KVNamespace;
  datasetId: string;
  config: DatasetConfig;
}

async function setDatasetConfig({ kv, datasetId, config }: SetDatasetConfigArgs): Promise<void> {
  const key = `dataset:${datasetId}`;
  await kv.put(key, JSON.stringify(config));
}

interface GetDurableObjectIdArgs {
  datasetId: string;
  region: DurableObjectRegion;
  shard?: number;
}

function getDurableObjectId({ datasetId, region, shard = 0 }: GetDurableObjectIdArgs): string {
  return `${region}.${shard}.${datasetId}`;
}

interface GetClosestAvailableRegionArgs {
  request: Request;
  primaryRegion: DurableObjectRegion;
  replicaRegions?: DurableObjectRegion[];
  isReadOperation: boolean;
}

function getClosestAvailableRegion({ request, primaryRegion, replicaRegions, isReadOperation }: GetClosestAvailableRegionArgs): DurableObjectRegion {
  // Check for x-force-region header (for testing)
  const forceRegion = request.headers.get('x-force-region');
  if (forceRegion && VALID_REGIONS.includes(forceRegion as DurableObjectRegion)) {
    const forcedRegion = forceRegion as DurableObjectRegion;
    const allRegions = [primaryRegion, ...(replicaRegions || [])];

    // Only allow forcing to regions that actually have the dataset
    if (allRegions.includes(forcedRegion)) {
      return forcedRegion;
    }

    // If forced region doesn't have the dataset, throw error
    throw new Error(`Cannot force region ${forcedRegion}: dataset not available in that region. Available regions: ${allRegions.join(', ')}`);
  }

  // For write operations, always use primary
  if (!isReadOperation) {
    return primaryRegion;
  }

  // For read operations, use the closest region (primary or replica)
  const allRegions = [primaryRegion, ...(replicaRegions || [])];
  const requestRegion = getClosestDurableObjectRegion({
    continent: request.cf?.continent as string | undefined,
    latitude: request.cf?.latitude as number | undefined,
    longitude: request.cf?.longitude as number | undefined
  });

  // If the request's closest region is in our available regions, use it
  if (allRegions.includes(requestRegion)) {
    return requestRegion;
  }

  // Otherwise use primary
  return primaryRegion;
}

/* ======================================================================
   Export and Utility Functions
   ==================================================================== */

async function processTarArchive({
  url,
  datasetId,
  orgId,
  path,
  metadata,
  region,
  stub,
  ctx
}: {
  url: string;
  datasetId: string;
  orgId: string;
  path?: string;
  metadata?: any;
  region: DurableObjectRegion;
  stub: any;
  ctx: ExecutionContext;
}): Promise<{ filesImported: number; totalSizeBytes: number }> {
  const startTime = Date.now();
  let filesImported = 0;
  let totalSizeBytes = 0;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'No error body');
      throw new Error(
        `Tar archive fetch failed (${response.status} ${response.statusText}). URL: ${url}. Error: ${errorBody}`,
      );
    }

    // Check content type
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('gzip') && !contentType.includes('tar') && !contentType.includes('octet-stream')) {
      throw new Error(
        `Invalid content type: ${contentType}. Expected tar.gz archive. URL: ${url}`,
      );
    }
    console.log(`[import-tar-worker] Fetching tar archive from ${url} ${contentType ? `(type: ${contentType})` : ''}`);

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Process files in batches to avoid memory issues
    const BATCH_SIZE = 50;
    let currentBatch: FileSchema[] = [];
    let batchNumber = 0;

    // Helper function to process current batch
    const processBatch = async () => {
      if (currentBatch.length === 0) return;

      batchNumber++;
      console.log(`[import-tar-worker] Upserting batch ${batchNumber} (${currentBatch.length} files)...`);
      const batchStartTime = Date.now();

      try {
        await stub.upsertFiles({
          datasetId,
          orgId,
          files: currentBatch,
          region,
          waitForReplication: false
        });

        const batchDuration = (Date.now() - batchStartTime) / 1000;
        filesImported += currentBatch.length;
        console.log(`[import-tar-worker] Batch ${batchNumber} completed in ${batchDuration.toFixed(2)}s (total files: ${filesImported})`);

        // Clear the batch
        currentBatch = [];
      } catch (batchError) {
        console.error(`[import-tar-worker] Batch ${batchNumber} failed:`, batchError);
        throw batchError;
      }
    };

    // Decompress and parse tar archive
    const gz = response.body.pipeThrough(new DecompressionStream("gzip"));

    let entriesProcessed = 0;
    console.log(`[import-tar-worker] Starting to parse tar archive...`);

    // Process tar entries in streaming fashion
    let processingPromise = Promise.resolve();
    let isParsingComplete = false;

    const parsePromise = parseTar(gz, (entry) => {
      entriesProcessed++;
      if (entriesProcessed % 100 === 0) {
        console.log(`[import-tar-worker] Processed ${entriesProcessed} tar entries so far...`);
      }

      if (entry.header.type !== "file") return;

      // Extract relative path (remove first directory component which is the repo name)
      const relativePath = entry.name.split("/").slice(1).join("/");

      // Skip if path filter is specified and doesn't match
      if (path && !relativePath.startsWith(path)) return;

      // Check if file has supported extension
      const hasSuportedExtension = SUPPORTED_EXTENSIONS.some(ext => relativePath.endsWith(ext));
      if (!hasSuportedExtension) return;

      // Chain processing to ensure sequential execution
      processingPromise = processingPromise.then(async () => {
        try {
          const buffer = await entry.arrayBuffer();

          // Only store files under 1MB
          if (buffer.byteLength >= 1_000_000) {
            console.log(`[import-tar-worker] Skipping large file (${(buffer.byteLength / 1024 / 1024).toFixed(2)}MB): ${relativePath}`);
            return;
          }

          const content = new TextDecoder("utf-8", {
            fatal: true,
            ignoreBOM: false,
          }).decode(buffer);

          // Remove path prefix if specified
          const filename = path && relativePath.startsWith(path)
            ? relativePath.slice(path.length).replace(/^\//, '')
            : relativePath;

          currentBatch.push({
            filename,
            content,
            metadata: {
              ...metadata,
              importedAt: new Date().toISOString(),
              originalPath: relativePath
            },
            weight: 1.0
          });

          totalSizeBytes += buffer.byteLength;

          // Process batch when it reaches BATCH_SIZE
          if (currentBatch.length >= BATCH_SIZE) {
            await processBatch();
          }
        } catch (error) {
          // Skip files that can't be decoded as UTF-8
          console.warn(`[import-tar-worker] Skipping file ${relativePath}: ${error.message}`);
        }
      });
    });

    // Wait for parsing to complete
    await parsePromise;
    isParsingComplete = true;

    // Wait for all processing to complete
    await processingPromise;

    // Process any remaining files in the last batch
    if (currentBatch.length > 0) {
      console.log(`[import-tar-worker] Processing final batch with ${currentBatch.length} files`);
      await processBatch();
    }

    console.log(`[import-tar-worker] Finished parsing tar archive. Total entries: ${entriesProcessed}, Files imported: ${filesImported}`);

  } catch (error) {
    const endTime = Date.now();
    const durationSeconds = (endTime - startTime) / 1000;
    console.error(`[import-tar-worker] Failed after ${durationSeconds} seconds:`, error);

    // Re-throw with more context
    if (error.message?.includes('Invalid tar header')) {
      throw new Error(`TarParseError: ${error.message}`);
    }
    throw error;
  }

  const endTime = Date.now();
  const durationSeconds = (endTime - startTime) / 1000;
  console.log(`[import-tar-worker] Imported ${filesImported} files from tar archive in ${durationSeconds} seconds`);

  return {
    filesImported,
    totalSizeBytes
  };
}

// Export the app for client generation
export { app };

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext) =>
    app.handle(req, { state: { env, ctx, orgId: null } }),
};


function formatFileWithLines(
  contents: string,
  showLineNumbers: boolean,
  startLine?: number,
  endLine?: number,
): string {
  const lines = contents.split("\n");

  // Filter lines by range if specified
  const filteredLines = (() => {
    if (startLine !== undefined || endLine !== undefined) {
      const start = startLine ? Math.max(0, startLine - 1) : 0;
      const end = endLine ? Math.min(endLine, lines.length) : lines.length;
      return lines.slice(start, end);
    }
    return lines;
  })();

  // Show line numbers if requested or if line ranges are specified
  const shouldShowLineNumbers =
    showLineNumbers || startLine !== undefined || endLine !== undefined;

  if (shouldShowLineNumbers) {
    const startLineNumber = startLine || 1;
    const maxLineNumber = startLineNumber + filteredLines.length - 1;
    const padding = maxLineNumber.toString().length;

    const formattedLines = filteredLines.map((line, index) => {
      const lineNumber = startLineNumber + index;
      const paddedNumber = lineNumber.toString().padStart(padding, " ");
      return `${paddedNumber}  ${line}`;
    });

    return formattedLines.join("\n");
  }

  return filteredLines.join("\n");
}
