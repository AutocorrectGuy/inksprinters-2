import { DexieJsTable } from "../utils/DexieJsTable"

export type AppSettings = {
  id?: number
  key: string
  value: any
}

export const appSettingsModel: DexieJsTable<AppSettings> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  key: { type: 'string', validation: ['isAlphaNumeric', 'isRequired'], unique: true },
  value: { type: 'string', validation: ['isRequired'] },
}
