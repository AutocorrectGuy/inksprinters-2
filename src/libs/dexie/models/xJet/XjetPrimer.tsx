import { DexieJsTable } from '../../utils/DexieJsTable'

export type XjetPrimer = {
  id?: number
  name: string
  description: string
  image: ArrayBuffer
  created_at: number
}

// Define the DexieJsTable for Primer
export const xjetPrimerModel: DexieJsTable<XjetPrimer> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  name: {
    type: 'string',
    validation: ['isRequired', 'isCsvText'],
    unique: true,
  },
  image: { type: 'image', validation: ['isRequired'] },
  description: { type: 'string', validation: ['isCsvText'] },
  created_at: { type: 'number', validation: ['isNumeric'] },
}
