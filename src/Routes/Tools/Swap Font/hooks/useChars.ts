import { useMemo } from 'react'
import { CharCardProps } from '../components/CharCard'
import ASCII_CHARS from '../ASCII_CHARS'

export type CharProps = { unicode: number }

const excludedChars = new Set([10, 13]) // Unicode values for \n (10) and \r (13)

const useChars = (inputText: string) => {
  return useMemo(() => {
    const usedUnicodeSet = new Set(
      inputText
        .split('')
        .map((char) => char.charCodeAt(0))
        .filter((code) => !excludedChars.has(code))
    )

    const asciiUnicodeSet = new Set(
      Array.from(ASCII_CHARS)
        .map((char) => char.charCodeAt(0))
        .filter((code) => !excludedChars.has(code))
    )

    const newUsedAsciiChars: CharCardProps[] = []
    const newNonAsciiChars: CharCardProps[] = []
    const newNonUsedAsciiChars: CharCardProps[] = []

    usedUnicodeSet.forEach((code) => {
      const char: CharProps = { unicode: code }
      if (asciiUnicodeSet.has(code)) {
        newUsedAsciiChars.push({ unicode: char.unicode, usecase: 'usedAscii' })
      } else {
        newNonAsciiChars.push({ unicode: char.unicode, usecase: 'nonAscii' })
      }
    })

    asciiUnicodeSet.forEach((code) => {
      if (!usedUnicodeSet.has(code)) {
        newNonUsedAsciiChars.push({ unicode: code, usecase: 'nonUsedAscii' })
      }
    })

    return {
      nonAsciiChars: newNonAsciiChars,
      usedAsciiChars: newUsedAsciiChars,
      nonUsedAsciiChars: newNonUsedAsciiChars,
    }
  }, [inputText])
}

export default useChars
