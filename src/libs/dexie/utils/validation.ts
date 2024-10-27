/**
 *  Validation functions
 */

import Dexie, { IndexableType } from "dexie"
import { DexieJsTable } from "./DexieJsTable"


type ValidationFunction = (value: any) => boolean

type ValidationFunctionMap = {
  isAlpha?: ValidationFunction
  isNumeric?: ValidationFunction
  isBoolean?: ValidationFunction
  isAlphaNumeric?: ValidationFunction
  isCsvText?: ValidationFunction
  isOptional?: ValidationFunction
  isRequired?: ValidationFunction
}

export type ValidationFunctionKey = keyof ValidationFunctionMap

export const isAlpha = (value: string): boolean => /^[A-Za-z_]*$/.test(value)
export const isNumeric = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value)
export const isAlphaNumeric = (value: string): boolean =>  /^[A-Za-z0-9_]*$/.test(value)
export const isCsvText = (value: string): boolean =>  /^[A-Za-z0-9_ .\-!@#$%^&*()+=?<>:{}|~`/\\;'\[\]]*$/.test(value)
export const isBoolean = (value: any): boolean => typeof value === 'boolean'
export const isRequired = (value: any): boolean => value !== null && value !== undefined && value !== ''

const validationFunctions: ValidationFunctionMap = {
  isAlpha,
  isNumeric,
  isBoolean,
  isAlphaNumeric,
  isCsvText,
  isRequired,
}

export const validateData = async <T>(
  value: T,
  model: DexieJsTable<T>,
  db: Dexie.Table<T, any>,
  sanitizeObject = true
): Promise<void> => {
  let errors: string[] = [];

  for (const key of Object.keys(model)) {
    const fieldSpec = model[key as keyof T];
    const fieldValue = value[key as keyof T];

    fieldSpec.validation?.forEach((validationKey) => {
      const validate = validationFunctions[validationKey as keyof ValidationFunctionMap];
      if (validate && !validate(fieldValue)) {
        errors.push(`Validation failed for '${validationKey}' in field '${key}' with value '${fieldValue}'.`);
      }
    });

    if (fieldSpec.unique) {
      // Assert that fieldValue is of IndexableType to satisfy Dexie's type constraints
      const exists = await db.where(key).equals(fieldValue as IndexableType).count();
      if (exists > 0) {
        errors.push(`${key.split('').map((ch, i) => !i ? ch.toUpperCase() : ch).join('')} "${fieldValue}" already exists.`);
      }
    }
  }

  if (errors.length > 0) throw new Error(errors.join('\n'));

  if (sanitizeObject) sanitizeObjectKeys(value as Record<string, any>, model);
};

const sanitizeObjectKeys = <T>(obj: Record<string, any>, model: DexieJsTable<T>): void => {
  // Ensure all keys from the model are present in obj
  Object.keys(model).forEach((key) => {
    if (obj[key] === undefined || obj[key] === null || (typeof obj[key] === 'string' && obj[key].trim() === '')) {
      delete obj[key]
    }
  })
}
