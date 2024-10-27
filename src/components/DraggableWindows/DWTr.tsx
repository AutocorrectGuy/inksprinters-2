import React, { memo } from 'react'
import { twMerge } from 'tailwind-merge'

type TrProps = {
  name: string
  label: string
  value: string | undefined
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputClassName?: string
}

// Define the Tr component with a generic type parameter
const Tr = memo((props: TrProps) => (
  <div className='table-row w-full'>
    <div className='table-cell pb-[2px]'>
      <div className='input-label'>{props.label}</div>
    </div>{' '}
    {/* Adjust width as needed for label */}
    <div className='table-cell pb-[2px]'>
      <input
        className={twMerge('input-text', props.inputClassName)}
        autoComplete='off'
        name={String(props.name)}
        value={props.value || ''}
        onChange={props.handleInputChange}
      />
    </div>
  </div>
))

export default Tr
