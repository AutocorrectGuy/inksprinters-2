import { ReactElement } from 'react'
import CUSTOM_ICONS, { CustomIconType } from './CUSTOM_ICONS'
import { twMerge } from 'tailwind-merge'

type Props = {
  icon: CustomIconType
  className?: string
  onClick?: () => void
}

const CustomIcon = (props: Props): ReactElement => {
  return (
    <svg
      onMouseDown={() => props.onClick && props.onClick()}
      viewBox='0 0 512 512'
      className={twMerge('fill-current stroke-current', props.className)}
    >
      {CUSTOM_ICONS[props.icon]}
    </svg>
  )
}

export default CustomIcon
