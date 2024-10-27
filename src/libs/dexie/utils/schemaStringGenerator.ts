import { DexieJsTableColumn } from "./DexieJsTable"

export const generateDexieSchemaString = (tableSpecs: {
  [key: string]: DexieJsTableColumn
}): string => {
  return Object.entries(tableSpecs)
    .map(([key, spec]) => {
      let fieldSchema = ''
      if (spec.autoIncrement) {
        fieldSchema = '++'
      } else if (spec.unique) {
        fieldSchema = '&'
      }
      fieldSchema += key
      return fieldSchema
    })
    .join(', ')
}
