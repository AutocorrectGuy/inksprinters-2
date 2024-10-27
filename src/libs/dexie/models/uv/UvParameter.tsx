import { DexieJsTable } from '../../utils/DexieJsTable'

export type UvParameter = {
  id?: number
  name: string
  // Main Settings
  speed: number
  frequency: number
  power: number
  repetitions: number
  // Wobble Settings
  wobble_type: number
  wobble_thickness: number
  wobble_frequency: number
  // Advanced Settings
  pulse_width: number
  delay_on: number
  delay_off: number
  delay_pos: number
  delay_angle: number
  // Fpk Settings
  fpk_time: number
  fpk_low_level: number
  fpk_high_level: number
}

// Define the DexieJsTable for Primer
export const uvParameterModel: DexieJsTable<UvParameter> = {
  id: { type: 'number', validation: [], autoIncrement: true },
  name: { type: 'string', validation: ['isCsvText', 'isRequired'], unique: true },
  // Main Settings
  speed: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  frequency: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  power: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  repetitions: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  // Wobble Settings
  wobble_type: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  wobble_thickness: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  wobble_frequency: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  // Advanced Settings
  pulse_width: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  delay_on: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  delay_off: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  delay_pos: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  delay_angle: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  // Fpk Settings
  fpk_time: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  fpk_low_level: { type: 'number', validation: ['isNumeric', 'isRequired'] },
  fpk_high_level: { type: 'number', validation: ['isNumeric', 'isRequired'] },
}
