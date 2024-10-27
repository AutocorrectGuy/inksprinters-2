import React from 'react'
import { CharProps } from '../hooks/useChars'

export const charUsecase = {
  usedAscii: { bgColor: 'bg-cyan-700 hover:bg-cyan-800', textColor: 'text-cyan-600' },
  nonAscii: { bgColor: 'bg-rose-600 hover:bg-rose-600', textColor: 'text-rose-400' },
  nonUsedAscii: { bgColor: 'bg-cyan-700 hover:bg-cyan-800', textColor: 'text-cyan-600' },
} as const

export type CharUseCaseType = keyof typeof charUsecase

export type CharCardProps = CharProps & {
  usecase: CharUseCaseType
}

const CharCard: React.FC<CharCardProps> = ({ unicode, usecase }) => {
  const { bgColor, textColor } = charUsecase[usecase]

  return (
    <div
      className={`relative hover:scale-[200%] hover:z-10 hover:shadow-lg hover:shadow-black/80 cursor-pointer m-0.5 flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-sm text-[0.6rem] ${bgColor}`}
    >
      <div className="mb-1 text-xl">{String.fromCharCode(unicode)}</div>
      <div className={`absolute -top-0.5 right-0.5 select-none font-semibold ${textColor}`}>
        {unicode}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 w-full rounded-b-sm bg-black/10"></div>
    </div>
  )
}

export default CharCard
