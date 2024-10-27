const SearchBarTop = () => {
  return (
    <div className='absolute top-0 w-full left-0 flex justify-center z-[3]'>
      <div className='relative flex items-center justify-center group'>
        <svg viewBox='0 0 530.27 55.22' className='h-14'>
          <path
            className='fill-[#051522] group-hover:fill-[#0c202c] duration-100'
            d='M529.29.22l-10.92,48.49c-.74,3.29-3.53,5.51-6.94,5.51H18.84c-3.41,0-6.2-2.22-6.94-5.51L.98.22'
          />
          <path
            className='fill-[#173948] group-hover:fill-[#388299] duration-100'
            d='M511.43,55.22H18.84c-3.89,0-7.07-2.53-7.92-6.29L0,.44l1.95-.44,10.92,48.49c.64,2.83,3.04,4.73,5.97,4.73h492.59c2.93,0,5.33-1.9,5.97-4.73l10.92-48.49,1.95.44-10.92,48.49c-.85,3.76-4.03,6.29-7.92,6.29Z'
          />
        </svg>
        <div className='absolute flex h-full left-4 right-4 p-2 border-b-2 border-b-transparent'>
          <input
            type='text'
            className='grow bg-[#0c202c] group-hover:bg-[#051522] focus:outline-none border-2 border-transparent focus:border-[#388299] rounded-md px-2 text-cyan-100'
          />
          <button className='text-cyan-200 px-4 text-lg border-2 border-transparent rounded-md hover:border-[#388299] ml-2 hover:ml-4 duration-200 hover:text-white select-none'>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBarTop
