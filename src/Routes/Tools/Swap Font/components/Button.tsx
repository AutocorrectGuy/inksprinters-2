import React from 'react'
import { cn } from '../../../../libs/tailwindcss/utils'

type Props = {
  iconOnLeft?: React.ReactNode
  iconOnRight?: React.ReactNode
  text: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  fileUpload?: boolean
}

const Button = ({
  text,
  className,
  iconOnLeft,
  iconOnRight,
  onClick,
  onFileChange,
  fileUpload,
}: Props) => {
  return (
    <div
      className="group cursor-pointer select-none rounded-md bg-blue-800 pb-1 active:translate-y-1 active:bg-transparent"
      onClick={onClick}
    >
      {fileUpload ? (
        <label
          className={cn(
            'flex cursor-pointer items-center rounded-md bg-blue-600 px-4 py-2 text-white group-hover:bg-blue-500',
            className
          )}
        >
          {iconOnLeft && <span className="mr-2">{iconOnLeft}</span>}
          {text}
          <input type="file" className="hidden" onChange={onFileChange} />
          {iconOnRight && <span className="ml-2">{iconOnRight}</span>}
        </label>
      ) : (
        <div
          className={cn(
            'flex items-center rounded-md bg-blue-600 px-4 py-2 text-white group-hover:bg-blue-500',
            className
          )}
        >
          {iconOnLeft && <span className="mr-2">{iconOnLeft}</span>}
          {text}
          {iconOnRight && <span className="ml-2">{iconOnRight}</span>}
        </div>
      )}
    </div>
  )
}

export default Button
