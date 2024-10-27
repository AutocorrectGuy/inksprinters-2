import React from 'react'

type Props = {}

const VersionControl = (props: Props) => {
  return (
    <div className='absolute w-12 min-h-screen max-h-screen h-screen right-0 top-0 flex flex-col items-center justify-center opacity-25 select-none z-[2]'>
      <div className='text-cyan-100 -rotate-90 whitespace-nowrap'>version: 2.0.0-beta.1</div>
    </div>
  )
}

export default VersionControl
