import { DexieJsTable } from "../../utils/DexieJsTable"

enum TEST {

}

const DUMMY_ARTICLE = {
  id: 2,
  article_number: '2114',
  name: 'Athos White pen',
  x: 39.900,
  y: 13.600,
  z: 15.000,
  jig_name: '2114 Athos pens',
  alignment: 'Right',
  image_name: 'img_202311130855545800',
  img_w: 60,
  img_h: 7,
  rotation: '↓',
  notes: 'Some notes',
  primer: 'Alcohool',
  priming_duration: 26,
}





export type BrowserXjetArticle = {
  id?: number
  name: string
  number?: string
  x?: number
  y?: number
  z?: number
  jig_id?: number
  primer_id?: number
  alignment?: string
  image?: ArrayBuffer
  image_w?: number
  image_h?: number
  rotation?: string
  notes?: string
  created_at: number
}

export type StoredXjetArticle = {
  id?: number
  name: string
  number?: string
  x?: number
  y?: number
  z?: number
  jig_id?: number
  primer_id?: number
  alignment?: string
  image?: string
  image_w?: number
  image_h?: number
  rotation?: string
  notes?: string
  created_at: number
}















// // Define the DexieJsTable for Primer
// export const xjetArticleModel: DexieJsTable<XjetArticle> = {
//   id: { type: 'number', validation: [], autoIncrement: true },
//   name: { type: 'string', validation: ['isAlphaNumeric', 'isRequired'] },
//   colors: { type: 'string' },
//   number: { type: 'string' },
//   x: { type: 'number' },
//   y: { type: 'number' },
//   z: { type: 'number' },
//   jig_id: { type: 'number' },
//   primer_id: { type: 'number' },
//   alignment: { type: 'string' },
//   image: { type: 'image' },
//   image_w: { type: 'number' },
//   image_h: { type: 'number' },
//   rotation: { type: 'number' },
//   notes: { type: 'string' },
//   priming_duration: { type: 'number', validation: ['isNumeric', 'isRequired'] },
//   created_at: { type: 'number', validation: ['isNumeric'] },
//   // for joining images
//   imported_image_name: { type: 'string' },
//   imported_jig_name: { type: 'string' },
//   imported_primer_name: { type: 'string' },
// }
