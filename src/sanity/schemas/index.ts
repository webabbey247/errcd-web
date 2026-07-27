import type { SchemaTypeDefinition } from "sanity";
import { objectSchemas } from "./objects";
import { documentSchemas } from "./documents";

export const schemaTypes: SchemaTypeDefinition[] = [
  ...objectSchemas,
  ...documentSchemas,
];

export { SINGLETON_TYPES } from "./documents";
