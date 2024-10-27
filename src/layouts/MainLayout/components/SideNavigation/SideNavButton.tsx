import CustomIcon from '../../../../components/CustomIcons/CustomIcon'
import { CustomIconType } from '../../../../components/CustomIcons/CUSTOM_ICONS'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSideNav } from './SideNavContext'
import { twMerge } from 'tailwind-merge'

export type SideNavBtnType = {
  text: string
  icon: CustomIconType
  href: string
}

const SideNavButton = (props: SideNavBtnType) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDropdownVisible, hideDropdown, showDropdown } = useSideNav()
  const sameRoute = location.pathname === props.href


  return (
    <div
      onMouseDown={() => {
        if (!sameRoute) {
          hideDropdown()
          navigate(props.href)
        }
      }}
      onMouseLeave={() => {
        if(!isDropdownVisible) {
          showDropdown()
        }
      }}
      className={`${
        sameRoute ? 'bg-cyan-200/5 rounded-lg' : ''
      } flex items-center py-3 px-3 cursor-pointer group/btn m-1`}
    >
      <CustomIcon
        icon={props.icon}
        className={`${
          sameRoute ? 'text-cyan-200' : 'text-[#388299]'
        } w-12 h-12 group-hover/btn:text-white duration-200`}
      />
      <div className={twMerge(isDropdownVisible ? 'w-44 pl-4' : 'w-0 overflow-hidden pl-0', 'duration-100 text-2xl font-orbitron tracking-widest text-cyan-200 group-hover/btn:text-white pt-1')}>
        {props.text}
      </div>
    </div>
  )
}

export default SideNavButton
