import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextArea from './TextArea'
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

type Props = {
  inputText: string
  outputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
  fontUrl: string | null
}

const Preview = (props: Props) => {
  const [viewOriginal, setViewOriginal] = useState<boolean>(false)

  return (
    <div className="flex grow flex-col gap-4">
      <div className="rounded-lg bg-[#082738] p-4 text-center text-xl font-semibold">Preview</div>

      <div className="grid flex-1 grow grid-cols-2 gap-4">
        <div className="flex flex-col overflow-hidden rounded-md bg-[#082738]">
          <h3 className="p-4 text-lg font-semibold">Default font</h3>
          <TextArea text={props.inputText} onChange={props.setInputText} />
        </div>

        <div className="flex flex-col overflow-hidden rounded-md bg-[#082738]">
          <div className="flex items-center justify-between p-4 text-lg font-semibold">
            <h3>After swapping</h3>
            <FontAwesomeIcon
              onMouseEnter={() => setViewOriginal(true)}
              onMouseLeave={() => setViewOriginal(false)}
              className="cursor-pointer"
              icon={viewOriginal ? faEye : faEyeLowVision}
            />
          </div>
          <style>
            {`@font-face {
            font-family: 'CustomFont';
            src: url(${props.fontUrl});
          }
          .custom-font {
            font-family: 'CustomFont';
          }`}
          </style>
          <TextArea text={props.inputText} onChange={props.setInputText} />
        </div>
      </div>
    </div>
  )
}

export default Preview
