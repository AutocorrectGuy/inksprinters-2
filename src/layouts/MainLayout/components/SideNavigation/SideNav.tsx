import React, { useState } from 'react'
import LOGO from '../../../../assets/inksprinters-2-logo-project.svg'
import SideNavButton, { SideNavBtnType } from './SideNavButton'
import PATH_CONSTANTS from '../../../../Routes/config/pathConstants'
import { useSideNav } from './SideNavContext'

const buttons: SideNavBtnType[] = [
  { text: 'Home', icon: 'home', href: PATH_CONSTANTS.LANDING_PAGE },
  { text: 'Inventory', icon: 'folder', href: PATH_CONSTANTS.INVENTORY.INDEX },
  { text: 'Tools', icon: 'tools', href: PATH_CONSTANTS.TOOLS.INDEX },
  { text: 'CAD', icon: 'tasks', href: PATH_CONSTANTS.CAD.INDEX },
]

const SideNav = () => {
  const { isDropdownVisible, showDropdown, hideDropdown } = useSideNav()

  return (
    <div
      className='z-[2] absolute top-0 left-0 flex flex-col justify-center min-h-screen max-h-screen h-screen group bg-gradient-to-b from-[#07202D] to-[#05131f] bg-[#050E16] shadow-lg shadow-black/30 select-none'
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <div className='h-1/3 relative'>
        {isDropdownVisible && (
          <div className='absolute h-2/3 aspect-square -translate-x-[200%] group-hover:-translate-x-1/2 top-1/2 -translate-y-1/2 left-1/2 flex items-center pr-8 py-4 '>
            <img src={LOGO} className='w-full' />
          </div>
        )}
      </div>
      <div className='flex flex-col'>
        {buttons.map((btn, i) => (
          <SideNavButton key={`nav-btn-${i}`} {...btn} />
        ))}
      </div>

      <div className='grow'></div>
    </div>
  )
}

export default SideNav
