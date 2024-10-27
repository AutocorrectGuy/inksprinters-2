import { db, dbTable } from '../../../libs/dexie/core/db'
import { DexieJsTable } from '../../../libs/dexie/utils/DexieJsTable'
import { arrayBufferToBase64 } from './arrayBufferAndBase64Converters'

// convert to csv
export async function exportTableToCSV<T extends DexieJsTable<T>>(tableName: dbTable, model: T) {
  const data = await db.table(tableName).toArray()
  const allKeys = Object.keys(model)
  let csvContent = '\uFEFF' // UTF-8 Byte Order Mark (BOM)

  // Add the header row
  csvContent += allKeys.map((key) => `"${String(key).replace(/"/g, '""')}"`).join(',') + '\r\n'

  // Add the data rows
  data.forEach((row, i) => {
    const csvRow = allKeys
      .map((key) => {
        let value = row[key] ?? '' // Use empty string for missing values
        const isImage = model[key as keyof DexieJsTable<T>].type === 'image'
        if (isImage && value instanceof ArrayBuffer) {
          value = arrayBufferToBase64(value) // Convert ArrayBuffer to Base64 if it's an image
        } else {
          value = String(value) // Ensure all other values are treated as strings
        }
        return `"${value.replace(/"/g, '""')}"` // Properly escape and enclose values
      })
      .join(',')

    csvContent += `${csvRow}${i !== data.length - 1 ? '\r\n' : ''}` // Append the CSV row
  })
  // Instead of encodeURI, use Blob and URL.createObjectURL for handling special characters
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  // Create and trigger a download link
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${tableName}.csv`)
  document.body.appendChild(link)
  link.click()

  // Cleanup: revoke the blob URL and remove the link after a delay
  setTimeout(() => {
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
  }, 100)
}
