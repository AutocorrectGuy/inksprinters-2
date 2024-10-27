import { useState } from 'react'
import CustomIcon from '../CustomIcons/CustomIcon'

interface DropdownProps {
  options: { label: string; value: string | number }[]
  onChange: (value: string | number) => void
  value: string | number
}

const Dropdown = ({ options, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className='relative cursor-pointer'>
      <div className='input-text flex justify-between items-center' onMouseDown={() => setIsOpen(!isOpen)}>
        {/* any invalid selected option, including empty string */}
        <div className='pr-2'>{selectedOption?.label || 'Select...'}</div>
        <CustomIcon icon='chevron-down' className='w-4' />
      </div>
      {isOpen && (
        <div className='absolute z-10 bg-[#102b36] text-cyan-100 w-full rounded-md border border-cyan-800 mt-1 shadow-md shadow-black/25 overflow-hidden'>
          {options.map((option) => (
            <div
              key={option.value}
              className='px-3 py-2 whitespace-nowrap bg-[#102b36] hover:brightness-125'
              onMouseDown={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
