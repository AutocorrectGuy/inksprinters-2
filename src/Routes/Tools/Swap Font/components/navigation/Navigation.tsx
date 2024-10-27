import { faArrowsSpin, faBook, faFileText, faPenAlt, faTools } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  callbacks: {
    uploadFont: (e: React.ChangeEvent<HTMLInputElement>) => void
    uploadText: () => void
    about: () => void
    settings: () => void
    swapAgain: () => void
  }
}

const Navigation = ({ callbacks }: Props) => {
  return (
    <div className='flex w-full justify-between rounded-md bg-[#07202D] p-4'>
      <div className='flex gap-4'>
        <Button
          fileUpload
          text='Upload font'
          onFileChange={callbacks.uploadFont}
          iconOnLeft={<FontAwesomeIcon icon={faPenAlt} />}
        />
        <Button text='Upload text' onClick={callbacks.uploadText} iconOnLeft={<FontAwesomeIcon icon={faFileText} />} />
      </div>
      <div className='flex gap-4'>
        <Button text='About' onClick={callbacks.about} iconOnLeft={<FontAwesomeIcon icon={faBook} />} />
        <Button text='Settings' onClick={callbacks.settings} iconOnLeft={<FontAwesomeIcon icon={faTools} />} />
        <Button text='Swap again' onClick={callbacks.swapAgain} iconOnLeft={<FontAwesomeIcon icon={faArrowsSpin} />} />
      </div>
    </div>
  )
}

export default Navigation
