import { ISanityCode } from '../common';

/**
 * The way we handle schema markups will be updated in the future. To reduce
 * code refactors we create a type for schema markup and mapped it to the interface
 * for code.
 */
export interface ISanitySchemaMarkup {
  schemaMarkupDefinitions?: ISanityCode[];
}
