import { ChangeEvent } from "react"
import { DexieJsTable } from "../../../../libs/dexie/utils/DexieJsTable"
import { base64ToArrayBuffer } from "../../functions/arrayBufferAndBase64Converters"
import { toast } from "react-toastify"
import { customToastProps } from "../../../../libs/react-toastify/CustomReactToastify"
import { db, dbTable } from "../../../../libs/dexie/core/db"

const trimQuotationMarks = (s: string) => s.slice(1, -1)

export async function handleCsvImport<T>(event: ChangeEvent<HTMLInputElement>, tableName: dbTable, model: DexieJsTable<T>) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = async (e) => {
    const text = e.target?.result as string
    const rows = text
      .split('\n')
      .map((row) => row.split(','))

    // Assuming the first row contains headers
    const headers = rows[0]
    const data = rows.slice(1).map((row) => {
      const obj: Partial<T> = {} // Now obj is a Partial of generic type T
      row.forEach((value, index) => {
        const key = trimQuotationMarks(headers[index])
        if (key in model && key !== 'id') {
          const modelKey = key as keyof T
          const fieldModel = model[modelKey]
          value = trimQuotationMarks(value)
          if (fieldModel) {
            obj[modelKey] = key === 'image' ? base64ToArrayBuffer(value) : (value as any)
          }
        }
      })
      return obj
    })

    // Dynamically insert data into the specified Dexie table
    await db
      .table(tableName)
      .bulkAdd(data)
      .then(() => toast.success('Data imported successfully into ' + tableName))
      .catch((err) => {
        if (err instanceof Error) toast.error(err.message, customToastProps)
      })
  }

  reader.readAsText(file)
}