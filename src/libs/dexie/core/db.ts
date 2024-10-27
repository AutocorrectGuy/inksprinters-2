import Dexie from 'dexie'
import { AppSettings, appSettingsModel } from '../models/AppSettings'
import { generateDexieSchemaString } from '../utils/schemaStringGenerator'
import { UvArticle, uvArticleModel } from '../models/uv/uvArticle'
import { UvParameter, uvParameterModel } from '../models/uv/UvParameter'
import { UvShape, uvShapeModel } from '../models/uv/UvShape'

export type dbTable =
  | 'app_settings'
  | 'uv_articles'
  | 'uv_parameters'
  | 'uv_shapes'
  | 'xjet_primers'
  | 'xjet_jigs'
  | 'xjet_articles'

export class MyDatabase extends Dexie {
  app_settings: Dexie.Table<AppSettings, number>

  // UV
  uv_articles: Dexie.Table<UvArticle, number>
  uv_parameters: Dexie.Table<UvParameter, number>
  uv_shapes: Dexie.Table<UvShape, number>

  constructor() {
    super('inksprinters_app')

    this.version(1).stores({
      // Application settings
      app_settings: generateDexieSchemaString(appSettingsModel),

      // UV
      uv_articles: generateDexieSchemaString(uvArticleModel),
      uv_parameters: generateDexieSchemaString(uvParameterModel),
      uv_shapes: generateDexieSchemaString(uvShapeModel),
    })

    this.app_settings = this.table('app_settings' as dbTable)

    // UV
    this.uv_articles = this.table('uv_articles' as dbTable)
    this.uv_parameters = this.table('uv_parameters' as dbTable)
    this.uv_shapes = this.table('uv_shapes' as dbTable)
  }
}

// Create an instance of the database
export const db = new MyDatabase()
