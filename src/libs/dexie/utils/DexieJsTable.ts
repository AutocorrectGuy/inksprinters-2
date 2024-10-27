import { ValidationFunctionKey } from "./validation"

export type DexieJsTableColumn = {
  type: 'string' | 'number' | 'image' | 'boolean' | 'any'
  validation?: ValidationFunctionKey[]
  autoIncrement?: boolean
  unique?: boolean
}

export type DexieJsTable<T> = {
  [P in keyof T]: DexieJsTableColumn
}
