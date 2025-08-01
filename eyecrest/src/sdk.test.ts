import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { env } from 'cloudflare:test';
import { EyecrestClient } from './sdk.js';

// Round timestamp to nearest 2 minutes for stable snapshots
function roundToNearest2Minutes(timestamp: number): number {
  const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds
  return Math.round(timestamp / twoMinutes) * twoMinutes;
}

const PRODUCTION_URL = 'https://eyecrest.org';
const TEST_DATASET_ID = 'sdk-test-dataset-' + roundToNearest2Minutes(Date.now());
const JWT_TOKEN = env.EYECREST_EXAMPLE_JWT;

if (!JWT_TOKEN) {
  throw new Error('EYECREST_EXAMPLE_JWT not found in test environment');
}

// No need to track files - we'll delete entire dataset

describe('EyecrestClient', () => {
  // Create dataset before running tests that need it
  beforeAll(async () => {
    const response = await fetch(`${PRODUCTION_URL}/v1/datasets/${TEST_DATASET_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({})
    });
    
    if (!response.ok) {
      console.error(`Failed to create test dataset: ${await response.text()}`);
      // Dataset might already exist, continue anyway
    }
  });
  afterAll(async () => {
    // Delete entire test dataset
    console.log(`🗑️  Deleting test dataset ${TEST_DATASET_ID}...`);

    const deleteResponse = await fetch(`${PRODUCTION_URL}/v1/datasets/${TEST_DATASET_ID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });

    if (deleteResponse.ok) {
      console.log('✅ Test dataset deleted successfully');
    } else {
      console.error('❌ Failed to delete test dataset:', await deleteResponse.text());
    }
  });

  test('should create client with default base URL', () => {
    const client = new EyecrestClient({ token: 'test-token' });
    expect(client).toMatchInlineSnapshot(`
      EyecrestClient {
        "baseUrl": "https://eyecrest.org",
        "token": "test-token",
      }
    `);
  });

  test('should create client with custom base URL', () => {
    const client = new EyecrestClient({ 
      token: 'test-token',
      baseUrl: 'https://custom.example.com' 
    });
    expect(client).toMatchInlineSnapshot(`
      EyecrestClient {
        "baseUrl": "https://custom.example.com",
        "token": "test-token",
      }
    `);
  });

  test('should handle trailing slash in base URL', () => {
    const client = new EyecrestClient({ 
      token: 'test-token',
      baseUrl: 'https://custom.example.com/' 
    });
    expect(client).toMatchInlineSnapshot(`
      EyecrestClient {
        "baseUrl": "https://custom.example.com",
        "token": "test-token",
      }
    `);
  });

  test('should have all required methods', () => {
    const client = new EyecrestClient({ token: 'test-token' });
    
    expect(typeof client.upsertDataset).toMatchInlineSnapshot(`"function"`);
    expect(typeof client.upsertFiles).toMatchInlineSnapshot(`"function"`);
    expect(typeof client.deleteFiles).toMatchInlineSnapshot(`"function"`);
    expect(typeof client.getFile).toMatchInlineSnapshot(`"function"`);
    expect(typeof client.search).toMatchInlineSnapshot(`"function"`);
  });

  test('should upload and search files', async () => {
    const client = new EyecrestClient({ token: JWT_TOKEN, baseUrl: PRODUCTION_URL });
    
    // Upload test files
    await client.upsertFiles({
      datasetId: TEST_DATASET_ID,
      files: [
        {
          filename: 'sdk-test.md',
          content: '# SDK Test\n\nThis is a test file for the SDK.\n\n## Features\n\n- Type-safe API\n- Easy to use\n- Full error handling',
          weight: 1.2
        },
        {
          filename: 'sdk-docs.md',
          content: '# SDK Documentation\n\n## Installation\n\nInstall the SDK using npm or pnpm.\n\n## Usage\n\nImport and create a client.',
          metadata: { version: '1.0.0' }
        }
      ]
    });

    // No need to track files - dataset will be deleted at the end

    // Search for content
    const results = await client.search({
      datasetId: TEST_DATASET_ID,
      query: 'SDK',
      perPage: 5
    });

    expect(results).toMatchInlineSnapshot(`
      {
        "hasNextPage": false,
        "page": 0,
        "perPage": 5,
        "region": "weur",
        "results": [],
      }
    `);
  });

  test('should get file with line numbers', async () => {
    const client = new EyecrestClient({ token: JWT_TOKEN, baseUrl: PRODUCTION_URL });
    
    const file = await client.getFile({
      datasetId: TEST_DATASET_ID,
      filePath: 'sdk-test.md',
      showLineNumbers: true,
      start: 3,
      end: 7
    });

    expect(file).toMatchInlineSnapshot(`
      {
        "content": "3  This is a test file for the SDK.
      4  
      5  ## Features
      6  
      7  - Type-safe API",
        "metadata": {},
        "sha": "48ce1348bcaf391b590c42d479d4e99da0218f13",
      }
    `);
  });

  test('should throw error on non-ok response', async () => {
    const client = new EyecrestClient({ token: 'invalid-token', baseUrl: PRODUCTION_URL });
    
    await expect(client.search({
      datasetId: 'test-dataset',
      query: 'test'
    })).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: Request failed with status 401: {"error":"JWT verification failed: Invalid Compact JWS"}]`);
  });

  test('should get search results as text with returnAsText parameter', async () => {
    const client = new EyecrestClient({ token: JWT_TOKEN, baseUrl: PRODUCTION_URL });
    
    const text = await client.search({
      datasetId: TEST_DATASET_ID,
      query: 'Features',
      perPage: 2,
      returnAsText: true
    });

    expect(text).toMatchInlineSnapshot(`""`);
  });
});