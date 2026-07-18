import { MedusaRequest, MedusaResponse, MedusaNextFunction } from '@medusajs/framework';
import { MedusaError } from '@medusajs/framework/utils';

// Define the maximum allowed depth for relational queries
const MAX_EXPAND_DEPTH = 2; // e.g., 'items.variant.product' is depth 2

/**
 * Global Guardrail Middleware
 * Prevents wildcard queries and deeply nested relational queries from exhausting the database.
 */
export const queryGuardrailMiddleware = (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    // Medusa parses fields and expand from the URL query string
    const fields = req.query.fields as string | undefined;
    const expand = req.query.expand as string | undefined;

    // 1. Block Wildcards (*)
    if ((fields && fields.includes('*')) || (expand && expand.includes('*'))) {
        throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Wildcard queries (*) are prohibited for performance and security reasons. Please specify exact fields."
        );
    }

    // 2. Enforce Maximum Relation Depth
    const checkDepth = (paramStr: string) => {
        const params = paramStr.split(',');
        for (const param of params) {
            // Count the number of dots to determine depth
            const depth = (param.match(/\./g) || []).length;
            if (depth > MAX_EXPAND_DEPTH) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    `Query relation depth exceeds the maximum allowed depth of ${MAX_EXPAND_DEPTH}. Please flatten your request.`
                );
            }
        }
    };

    if (fields) checkDepth(fields);
    if (expand) checkDepth(expand);

    next();
};