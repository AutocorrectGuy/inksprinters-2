import { DexieJsTable } from '../../utils/DexieJsTable'

export type UvShapeType = 'cone' | 'cylinder'
export type UvShape = {
  // Main values
  id?: number
  name: string
  type: UvShapeType
  base_diameter: number
  cone_height?: number
  offset_ref_z?: number
  x_position?: number
  y_position?: number
  rotation?: number
  rotation_by_x?: number
  rotation_by_y?: number

  // Cylinder values
  minor_diameter?: number
  product_height?: number
  created_at: number
}

export const uvShapeModel: DexieJsTable<UvShape> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  name: { type: 'string', validation: ['isCsvText'] },
  type: { type: 'string', validation: ['isCsvText'] },
  base_diameter: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  cone_height: { type: 'number', validation: ['isNumeric'] },
  offset_ref_z: { type: 'number', validation: ['isNumeric'] },
  x_position: { type: 'number', validation: ['isNumeric'] },
  y_position: { type: 'number', validation: ['isNumeric'] },
  rotation: { type: 'number', validation: ['isNumeric'] },
  rotation_by_x: { type: 'number', validation: ['isNumeric'] },
  rotation_by_y: { type: 'number', validation: ['isNumeric'] },
  minor_diameter: { type: 'number', validation: ['isNumeric'] },
  product_height: { type: 'number', validation: ['isNumeric'] },
  created_at: { type: 'number', validation: ['isRequired'] },
}
