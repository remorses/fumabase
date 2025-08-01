import { tool } from 'ai'
import dedent from 'string-dedent'
import type { JSONSchema7 } from 'json-schema'
import * as schemaLib from 'json-schema-library'
import { z } from 'zod'
import { optionalToNullable } from './zod.js'
import { extractNamePathsFromSchema } from './schema-path-utils.js'

const compileSchema =
    schemaLib.compileSchema || schemaLib?.['default']?.compileSchema

export interface RenderFormToolConfig {
    jsonSchema?: JSONSchema7
    replaceOptionalsWithNulls?: boolean
    notifyError?: (error: any, msg?: string) => void
}

export function createRenderFormTool({
    jsonSchema,
    replaceOptionalsWithNulls,
    notifyError = (err, msg) =>
        console.error(msg || 'Error in createRenderFormTool', err),
}: RenderFormToolConfig) {
    let uiFieldsSchema = UIFieldSchema
    if (replaceOptionalsWithNulls) {
        uiFieldsSchema = optionalToNullable(uiFieldsSchema)
    }
    if (jsonSchema) {
        const exampleNamePaths = extractNamePathsFromSchema(jsonSchema)
        uiFieldsSchema = uiFieldsSchema.describe(
            `Each field requires a name property that describes the filed updated on that scalar field, it can be ${exampleNamePaths.join(', ')} where {index} is a number. NEVER use [index] syntax, for example instead of domains[0] use domains.0`,
        )
    }

    const compiledSchema = compileSchema(jsonSchema || {})
    const RenderFormParameters = z.object({
        fields: z.array(uiFieldsSchema),
    })

    // Helper function to get type for name in schema
    function getTypeForNameInSchema(name: string) {
        const pointer =
            '#' +
            '/' +
            name
                .split('.')
                .map((part) => (isNaN(Number(part)) ? part : 'items'))
                .join('/')
        console.log(pointer)
        const { node, error } = compiledSchema.getNode(pointer)
        return node?.schema
    }

    // Create execute function
    async function execute(params: z.infer<typeof RenderFormParameters>) {
        if (!jsonSchema) {
            return 'Rendered form to the user, when the user will submit the form, the data will be sent as a message'
        }
        const errors: string[] = []
        try {
            for (const field of params.fields) {
                if (field.name.match(/\[\s*index\s*\]/)) {
                    errors.push(
                        `field.name "${field.name}" contains "[index]" syntax; please use field.index instead.`,
                    )
                }
                const schema = getTypeForNameInSchema(field.name)
                if (!schema) {
                    errors.push(
                        `name ${field.name} is not valid for the schema`,
                    )
                }
                if (!isScalarSchema(schema)) {
                    errors.push(
                        `name ${field.name} is not a scalar, instead it has the following schema: ${JSON.stringify(schema)}`,
                    )
                }
            }
            return errors.length > 0 ? { errors } : `rendered form to the user`
        } catch (err) {
            notifyError(err, 'createRenderFormExecute')
            errors.push(
                `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
            )
            return { errors }
        }
    }

    return tool({
        description: dedent`
          Render a series of input elements so the user can provide structured data.
          Array-style names such as items[0].color are supported.
          Use radio type for small number of options (less than 4) where you want to show option descriptions alongside the choices.

          Never render too many form fields at once.

          If your workflow requires asking for a lot of fields, split the form into many messages, each one with 1 form field ideally.

          Only render many form fields in the case of list of items or fields that are part of an object.

          For data collection instead render one form field at a time.

          If the user submits a form without adding the fields you want do not ask the user to fill the form again. Instead render another form!
          Previous messages forms will be disabled and the user cannot submit them again. Instead render a simpler shorter form the user can fill in. Use relevant default values.

          Always try to fill in the default values so the user has less things to type and check.
      `,
        inputSchema: RenderFormParameters,
        execute,
    })
}

export function getTypeForNameInSchema(name: string, compiledSchema: any) {
    const pointer =
        '#' +
        '/' +
        name
            .split('.')
            .map((part) => (isNaN(Number(part)) ? part : 'items'))
            .join('/')
    console.log(pointer)
    const { node, error } = compiledSchema.getNode(pointer)
    return node?.schema
}

export function isScalarSchema(schema: any): boolean {
    // A scalar is any JSON Schema type that is not an array or object
    const scalarTypes = ['string', 'number', 'integer', 'boolean', 'null']
    if (!schema || typeof schema !== 'object') return false
    if (schema.anyOf && Array.isArray(schema.anyOf)) {
        // It's scalar if any of the anyOf sub-schemas are scalar
        return schema.anyOf.some((subSchema: any) => isScalarSchema(subSchema))
    }
    if (schema.enum) {
        // If it's an enum, check if the underlying type is scalar (assume enums of scalars)
        if (schema.type && Array.isArray(schema.type)) {
            return schema.type.some((type: any) => scalarTypes.includes(type))
        }
        if (schema.type) {
            return scalarTypes.includes(schema.type)
        }
        // If type is not specified but enum is present, assume scalar
        return true
    }
    if (schema.const) {
        // If const present, considered scalar
        return true
    }
    if (schema.oneOf && Array.isArray(schema.oneOf)) {
        // It's scalar if any of the oneOf sub-schemas are scalar
        return schema.oneOf.some((subSchema: any) => isScalarSchema(subSchema))
    }
    if (schema.allOf && Array.isArray(schema.allOf)) {
        // It's scalar if any of the allOf sub-schemas are scalar
        return schema.allOf.some((subSchema: any) => isScalarSchema(subSchema))
    }
    if (schema.type === 'array' || schema.type === 'object') {
        return false
    }
    if (Array.isArray(schema.type)) {
        // If multiple types, it's scalar if any are scalar
        return schema.type.some((type: any) => scalarTypes.includes(type))
    }
    return scalarTypes.includes(schema.type)
}

// Legacy schema exports
const FieldTypeEnum = z.enum([
    'input',
    'password',
    'textarea',
    'number',
    'select',
    'radio',
    'slider',
    'switch',
    'color_picker',
    'date_picker',
    'image_upload',
    'button',
])

export const UIFieldSchema = z.object({
    name: z.string(),
    type: FieldTypeEnum,
    label: z.string(),
    description: z.string().optional(),
    // Common fields
    required: z.boolean().optional(),
    // Group title for grouping consecutive fields
    groupTitle: z
        .string()
        .optional()
        .describe(
            `Optional group title. When consecutive fields share the same groupTitle, they will be wrapped in a container with this title. ONLY use this for array of objects to put each object in the array into its own group. `,
        ),
    // Input/textarea/password fields
    placeholder: z.string().optional(),
    initialValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
    // Number/slider fields
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional(),
    // Select field
    options: z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
                description: z.string().optional(),
            }),
        )
        .optional(),
    // Button field
    href: z.string().optional(),
})

export const RenderFormParameters = z.object({
    fields: z.array(UIFieldSchema),
})

export type UIField = z.infer<typeof UIFieldSchema>
export type RenderFormParameters = z.infer<typeof RenderFormParameters>
