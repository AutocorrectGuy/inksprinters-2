import { ChangeEvent } from 'react'
import { handleCsvImport } from './handleCsvImport'
import { dbTable } from '../../../../libs/dexie/core/db'
import { DexieJsTable } from '../../../../libs/dexie/utils/DexieJsTable'

export function importFromCsv<T>(tableName: dbTable, model: DexieJsTable<T>) {
  const input: HTMLInputElement = document.createElement('input')
  input.type = 'file'
  input.style.display = 'none'
  input.accept = '.csv'
  input.onchange = (e: Event) => {
    const changeEvent = e as unknown as ChangeEvent<HTMLInputElement>
    handleCsvImport(changeEvent, tableName, model)
    document.body.removeChild(input)
  }
  document.body.appendChild(input)
  input.click()
}
