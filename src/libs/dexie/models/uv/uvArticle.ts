import { DexieJsTable } from '../../utils/DexieJsTable'

export type UvArticle = {
  id?: number
  // Article data
  number: string
  name: string
  notes?: string
  is_in_testing_phase: boolean
  image?: ArrayBuffer
  // Article parameters
  image_width: number
  image_heigth: number
  // Laser
  laser_pos_x: number
  laser_pos_z: number
  // Other tables
  ug_jig_id?: number
  uv_parameter_id?: number
  uv_shape_id?: number
}

export const uvArticleModel: DexieJsTable<UvArticle> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  // Article data
  number: { type: 'string', validation: ['isCsvText', 'isRequired'], unique: true },
  name: { type: 'number', validation: ['isCsvText', 'isRequired'], unique: true },
  notes: { type: 'number', validation: ['isCsvText'] },
  is_in_testing_phase: { type: 'boolean', validation: [] },
  image: { type: 'image', validation: [] },
  // Article parameters
  image_width: { type: 'number', validation: ['isNumeric'] },
  image_heigth: { type: 'number', validation: ['isNumeric'] },
  laser_pos_x: { type: 'number', validation: ['isNumeric'] },
  laser_pos_z: { type: 'number', validation: ['isNumeric'] },
  // Other tables
  uv_parameter_id: { type: 'number', validation: ['isNumeric'] },
  uv_shape_id: { type: 'number', validation: ['isNumeric'] },
}
