import React, { ReactNode } from 'react'
import Container from '../../layouts/MainLayout/components/Container/Container'
import { Link } from 'react-router-dom'
import { CustomIconType } from '../../components/CustomIcons/CUSTOM_ICONS'
import CustomIcon from '../../components/CustomIcons/CustomIcon'
import PATH_CONSTANTS from '../config/pathConstants'
import useErrorBacktick from '../../assets/hooks/useErrorBacktick'

type CategoryType = 'printing' | 'marking' | 'documents'
type ToolType = {
  href: string
  name: string
  categories: CategoryType[]
  icon: CustomIconType
}

const BADGE: {
  [key in CategoryType]: {
    color: string
  }
} = {
  printing: {
    color: '#FF0000',
  },
  marking: {
    color: '#00AA00',
  },
  documents: {
    color: '#0000FF',
  },
}

export const tools: ToolType[] = [
  {
    href: '#',
    name: 'Center Artwork',
    categories: ['marking', 'printing'],
    icon: 'crosshair',
  },
  {
    href: PATH_CONSTANTS.TOOLS.CONE_CRAFTER,
    name: 'Cone Crafter',
    categories: ['marking'],
    icon: 'cone',
  },
  {
    href: PATH_CONSTANTS.TOOLS.SWAP_FONT,
    name: 'Encoding validation',
    categories: ['marking', 'documents'],
    icon: 'encoding',
  },
  {
    href: '#',
    name: 'Text Editor',
    categories: ['documents'],
    icon: 'pencil',
  },
]

const ToolCard = (props: ToolType) => {
  return (
    <Link
      to={props.href}
      className='border border-white rounded-r-md rounded-bl-md flex flex-col items-center justify-center'
    >
      <div className='text-2xl'>{props.name}</div>
      <CustomIcon icon={props.icon} className='text-cyan-300 border p-10' />

      {/* badges */}
      <div className='flex justify-end py-2 w-full pr-2 gap-2'>
        {props.categories.map((category, i) => (
          <span
            key={`category-${props.name}-${i}`}
            className='px-3 py-1 rounded-full text-sm'
            style={{ backgroundColor: BADGE[category].color }}
          >
            <div>{category}</div>
          </span>
        ))}
      </div>
    </Link>
  )
}

const Tools = () => {
  useErrorBacktick()

  return (
    <Container>
      <div className='flex flex-col grow justify-center items-center'>
        <h1 className='text-4xl text-center pb-20'>Available Tools</h1>
        <div className='grid grid-cols-4 grid-rows-1 gap-x-10 max-w-[1400px] w-full'>
          {tools.map((toolProps) => (
            <ToolCard key={`tool-card-${toolProps.name}`} {...toolProps} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Tools
