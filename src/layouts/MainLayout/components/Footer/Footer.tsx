import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='absolute bottom-0 left-0 right-0 w-full h-14 z-[3] mx-auto flex justify-center'>
      <div className='relative h-14 flex w-fit items-center'>
        <svg viewBox='0 0 327.38 54.14' className='h-full'>
          <path
            fill='#051522'
            d='M325.32,54.14H2.06L12.74,6.73c.63-2.83,3.03-4.73,5.96-4.73h289.98c2.93,0,5.33,1.9,5.96,4.73l10.68,47.41Z'
          />
          <path
            fill='#173948'
            d='M327.38,54.14h-2.06l-10.68-47.41c-.63-2.83-3.03-4.73-5.96-4.73H18.7c-2.93,0-5.33,1.9-5.96,4.73L2.06,54.14H0L10.78,6.29c.85-3.76,4.03-6.29,7.92-6.29h289.98c3.89,0,7.07,2.53,7.92,6.29l10.78,47.85Z'
          />
        </svg>
        <div className='select-none border-t-2 border-t-transparent absolute w-full text-center opacity-50 text-cyan-100'>
          Inksprinters 2023-2024
        </div>
      </div>
    </div>
  )
}

export default Footer
