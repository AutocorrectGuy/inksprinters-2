import { useState } from 'react'
import useChars from './hooks/useChars'
import Navigation from './components/navigation/Navigation'
import UsedCharacters from './components/usedCharacters/UsedCharacters'
import Preview from './components/preview/Preview'
import { modifyFont } from './modifyFont'
import Container from '../../../layouts/MainLayout/components/Container/Container'

const SwapFont = () => {
  const [inputText, setInputText] = useState(`Jānis Skūēniņš
Björn Žydrūnas
Elīna Pētersons
Ulf Jablonskytė
Øyvind Kuokkanen
Ingrīda Eglītis
Ægir Valančiūnas
Mārtiņš Zygmuntas
Eglė Karūžytė
Solveig Pērkons`)
  const { usedAsciiChars, nonAsciiChars, nonUsedAsciiChars } = useChars(inputText)
  const [fontUrl, setFontUrl] = useState<string | null>(null)

  return (
    <Container>
      <div className='mx-auto flex max-w-screen-xl grow flex-col gap-4 p-4 text-neutral-200'>
        <Navigation
          callbacks={{
            uploadFont: (e) => {
              modifyFont({
                file: e.target.files![0],
                inputfieldValue: inputText,
                updateInputfieldValue: setInputText,
                nonAsciiChars,
                nonUsedAsciiChars,
                setFontUrl,
              })
            },
            uploadText: () => {
              console.log('uploadText')
            },
            about: () => {
              console.log('about')
            },
            settings: () => {
              console.log('settings')
            },
            swapAgain: () => {
              console.log('swapAgain')
            },
          }}
        />
        <div className='grid flex-1 grid-cols-2 gap-4'>
          <Preview inputText={inputText} outputText={inputText} setInputText={setInputText} fontUrl={fontUrl} />
          <UsedCharacters
            nonAsciiChars={nonAsciiChars}
            usedAsciiChars={usedAsciiChars}
            nonUsedAsciiChars={nonUsedAsciiChars}
          />
        </div>
      </div>
    </Container>
  )
}

export default SwapFont
