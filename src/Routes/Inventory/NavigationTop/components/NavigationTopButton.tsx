import React, { useState } from 'react'
import { MainNavMenuOption } from '../NavigationTop'

export type NavEntryType = {
  buttonLabel: string
  action: () => void
}

type Props = { label: MainNavMenuOption; options: NavEntryType[] }

const NavigationTopButton = ({ label, options }: Props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  return (
    <div
      className='relative group cursor-pointer'
      onMouseEnter={() => setIsDropdownVisible(true)} // Show dropdown on mouse enter
      onMouseLeave={() => setIsDropdownVisible(false)} // Hide dropdown on mouse leave
    >
      <button className='bg-[#07202D] text-white h-full px-4 hover:brightness-125'>{label}</button>
      {isDropdownVisible && (
        <ul className='absolute z-10 bg-white shadow-lg shadow-black/50 flex flex-col'>
          {options.map((option, i) => (
            <button
              key={`nav-top-btn-${option.buttonLabel}-${i}`}
              className='px-4 py-3 bg-white text-neutral-700 font-medium whitespace-nowrap select-none hover:bg-gray-200 text-left'
              onMouseDown={() => {
                setIsDropdownVisible(false)
                option.action()
              }}
            >
              {option.buttonLabel}
            </button>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NavigationTopButton
