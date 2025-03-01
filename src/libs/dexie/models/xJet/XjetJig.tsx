import { DexieJsTable } from "../../utils/DexieJsTable"

export type OriginType = 'TopLeft' | 'LowerRight'
export type TemplateType = 'CopyTemplateLayout' //TODO: research other types
export type AllAlignment = 'MiddleCenter' //TODO: research other types

export type XjetJig = {
  id?: number
  name: string

  // Media Size
  pageSizeX?: number
  pageSizeY?: number
  margin?: number
  origin?: 'TopLeft' | 'LowerRight'
  originOffsetX?: number
  originOffsetY?: number
  isTemplate?: boolean
  type?: 'CopyTemplateLayout'
  copies?: number
  layoutSpaceX?: number
  layoutSpaceY?: number
  allAlignment?: 'MiddleCenter' // tf they were thinking when they made this? :D
  TemplateElementAdjustment?: string // !!! used only when exporting data
  templateGroup?: boolean

  // Flattened TemplateElement attributes with "Cell" prefix
  cellElementSizeX?: number
  cellElementSizeY?: number
  cellImageAlignmentX?: number
  cellImageAlignmentY?: number
  cellImageOffset?: boolean
  cellImageAlignment?: 'MiddleCenter' // :D
  cellEnableCenterOffset?: boolean
  cellEnableAlignment?: boolean
  cellEnableCenterOrigin?: boolean
  cellEnableCenterSpacing?: boolean
  cellBackgroundImage?: ArrayBuffer

  created_at: number
}

// Define the DexieJsTable for Primer
export const xjetJigModel: DexieJsTable<XjetJig> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  name: { type: 'string', validation: ['isAlphaNumeric', 'isRequired'], unique: true },
  pageSizeX: { type: 'number', validation: ['isNumeric'] },
  pageSizeY: { type: 'number', validation: ['isNumeric'] },
  margin: { type: 'number', validation: ['isNumeric'] },
  origin: { type: 'string', validation: [] }, // Validation can be custom to ensure 'TopLeft' or 'LowerRight'
  originOffsetX: { type: 'number', validation: ['isNumeric'] },
  originOffsetY: { type: 'number', validation: ['isNumeric'] },
  isTemplate: { type: 'boolean', validation: ['isBoolean'] },
  type: { type: 'string', validation: [] }, // Validation can be custom for 'CopyTemplateLayout'
  copies: { type: 'number', validation: ['isNumeric'] },
  layoutSpaceX: { type: 'number', validation: ['isNumeric'] },
  layoutSpaceY: { type: 'number', validation: ['isNumeric'] },
  allAlignment: { type: 'string', validation: [] }, // Custom validation for 'MiddleCenter'
  templateGroup: { type: 'boolean', validation: ['isBoolean'] },
  cellElementSizeX: { type: 'number', validation: ['isNumeric'] },
  cellElementSizeY: { type: 'number', validation: ['isNumeric'] },
  cellImageAlignmentX: { type: 'number', validation: ['isNumeric'] }, // Might need custom validation or conversion
  cellImageAlignmentY: { type: 'number', validation: ['isNumeric'] }, // Might need custom validation or conversion
  cellImageOffset: { type: 'boolean', validation: ['isBoolean'] },
  cellImageAlignment: { type: 'string', validation: [] }, // Custom validation for 'MiddleCenter'
  cellEnableCenterOffset: { type: 'boolean', validation: ['isBoolean'] },
  cellEnableAlignment: { type: 'boolean', validation: ['isBoolean'] },
  cellEnableCenterOrigin: { type: 'boolean', validation: ['isBoolean'] },
  cellEnableCenterSpacing: { type: 'boolean', validation: ['isBoolean'] },
  cellBackgroundImage: { type: 'image', validation: [] }, // Assuming 'blob' for ArrayBuffer
  created_at: { type: 'number', validation: ['isNumeric'] },
}
