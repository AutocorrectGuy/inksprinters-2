import { Font, FontEditor, TTF } from 'fonteditor-core'
import { saveAs } from 'file-saver'
import { CharCardProps } from './components/CharCard'

// (file: File, inputText: string): Promise<string>

type ModifyFontProps = {
  file: File
  nonAsciiChars: CharCardProps[]
  nonUsedAsciiChars: CharCardProps[]
  inputfieldValue: string
  updateInputfieldValue: React.Dispatch<React.SetStateAction<string>>
  setFontUrl: React.Dispatch<React.SetStateAction<string | null>>
}

const loadFont = async (file: File): Promise<FontEditor.Font> => {
  const arrayBuffer = await file.arrayBuffer()
  const font = Font.create(arrayBuffer, {
    type: 'ttf',
    subset: [],
    hinting: true,
    compound2simple: true,
  })
  return font
}

export const modifyFont = async ({
  file,
  nonAsciiChars,
  nonUsedAsciiChars,
  updateInputfieldValue,
  setFontUrl,
}: ModifyFontProps) => {
  if (!file) {
    console.error('failed to upload file!')
    return
  }

  // determine which characters will swap the illegal characters
  const replacerChars = nonUsedAsciiChars.slice(0, nonAsciiChars.length)
  // update original text from text inputfield
  updateReactInputfieldValue({ nonAsciiChars, replacerChars, updateInputfieldValue })

  // load font
  const font = await loadFont(file)
  const fontData = font.get()
  replaceGlyphs({ fontData, nonAsciiChars, replacerChars })
  const renamedFileName = renameFontFile(fontData)
  const newFontBlob = createNewFontFileBlob(font)
  const newFontUrl = URL.createObjectURL(newFontBlob)

  // download file
  saveAs(newFontBlob, `${renamedFileName}.ttf`)
  setFontUrl(prevUrl => {
    prevUrl && URL.revokeObjectURL(prevUrl)
    return newFontUrl
  })
}

const createNewFontFileBlob = (font: FontEditor.Font): Blob => {
  const newFontBuffer = font.write({ type: 'ttf' })
  return new Blob([newFontBuffer], { type: 'font/ttf' })
}

type ReplaceGlyphsProps = {
  fontData: TTF.TTFObject
  nonAsciiChars: CharCardProps[]
  replacerChars: CharCardProps[]
}
const replaceGlyphs = ({ fontData, nonAsciiChars, replacerChars }: ReplaceGlyphsProps) => {
  const replacerCharsUnicodes = replacerChars.map(char => char.unicode)

  const glyfs = fontData.glyf
  for (let i = 0; i < glyfs.length; i++) {
    const glyf = glyfs[i]
    if (!glyf.unicode) continue
    const unicode = glyf.unicode[0]
    const glyfIndex = replacerCharsUnicodes.findIndex(u => u === unicode)
    if (glyfIndex === -1) continue
    const replacerUnicode = nonAsciiChars[glyfIndex].unicode
    const replacerGlyph = glyfs.find(g => g.unicode && g.unicode.includes(replacerUnicode))
    if (!replacerGlyph) continue

    // Swap the artwork and related data, but keep the original unicode
    glyf.advanceWidth = replacerGlyph.advanceWidth
    glyf.contours = replacerGlyph.contours
    glyf.leftSideBearing = replacerGlyph.leftSideBearing
    glyf.name = replacerGlyph.name
    glyf.xMax = replacerGlyph.xMax
    glyf.xMin = replacerGlyph.xMin
    glyf.yMax = replacerGlyph.yMax
    glyf.yMin = replacerGlyph.yMin
  }
}

const renameFontFile = (fontData: TTF.TTFObject) => {
  const fontName = `${fontData.name.fontFamily}-modified-${Date.now()}`
  const nameTable = fontData.name
  nameTable.fontFamily = fontName
  nameTable.fullName = fontName
  nameTable.postScriptName = fontName
  nameTable.uniqueSubFamily = fontName
  nameTable.preferredFamily = fontName
  return fontName
}

type ReplaceCharacterType = {
  nonAsciiChars: CharCardProps[]
  replacerChars: CharCardProps[]
  updateInputfieldValue: React.Dispatch<React.SetStateAction<string>>
}

const updateReactInputfieldValue = ({
  updateInputfieldValue,
  nonAsciiChars,
  replacerChars,
}: ReplaceCharacterType) => {
  updateInputfieldValue(inputValue => {
    const nonAsciiCharsArr = nonAsciiChars.map(char => String.fromCharCode(char.unicode))
    const replacersArr = replacerChars.map(char => String.fromCharCode(char.unicode))
    const textArr = inputValue.split('')

    for (let i = 0; i < textArr.length; i++) {
      const index = nonAsciiCharsArr.indexOf(textArr[i])
      if (index !== -1) {
        textArr[i] = replacersArr[index]
      }
    }

    const replacedInputfieldValue = textArr.join('')
    return replacedInputfieldValue
  })
}
