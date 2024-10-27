import { useCallback, useEffect, useRef, useState } from 'react'
import CustomIcon from '../CustomIcons/CustomIcon'
import { twMerge } from 'tailwind-merge'

export type DWProps = {
  id: string
  content: React.ReactNode
  label: string
  onClose: (id: string) => void
}

const DW: React.FC<DWProps> = ({ id, label, content, onClose }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Handle mouse down event
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true)
      setDragOffset({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      })
      event.stopPropagation()
    },
    [position.x, position.y]
  )

  // Handle mouse move event
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: event.clientX - dragOffset.x,
          y: event.clientY - dragOffset.y,
        })
      }
    },
    [isDragging, dragOffset]
  )

  // Handle mouse up event
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (!windowRef.current) return
    setPosition({
      x: window.innerWidth / 2 - windowRef.current.clientWidth / 2,
      y: window.innerHeight / 2 - windowRef.current.clientHeight / 2,
    })
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={windowRef}
      className={twMerge(
        windowRef.current ? 'opacity-100' : 'opacity-0',
        'absolute flex flex-col shadow-lg shadow-black/50 border border-cyan-700 rounded-md'
      )}
      style={{ top: `${position.y}px`, left: `${position.x}px`, zIndex: 100 }}
    >
      <div
        className='w-full rounded-t-md py-2 px-3 flex justify-between bg-[#05141F] cursor-move'
        onMouseDown={handleMouseDown}
      >
        <h3 className='text-lg font-bold select-none whitespace-nowrap pr-8'>{label}</h3>
        <CustomIcon
          icon='close-x'
          onClick={() => onClose(id)}
          className='w-3 cursor-pointer text-cyan-900 select-none'
        />
      </div>
      <div className='p-4 bg-gradient-to-br from-cyan-900 to-cyan-950 text-cyan-100 rounded-b-md flex flex-col'>
        {content}
      </div>
    </div>
  )
}

export default DW
