import { CharCardProps } from '../CharCard'
import CharContainer from '../CharContainer'

type Props = {
  usedAsciiChars: CharCardProps[]
  nonAsciiChars: CharCardProps[]
  nonUsedAsciiChars: CharCardProps[]
}

const UsedCharacters = ({ nonAsciiChars, nonUsedAsciiChars, usedAsciiChars }: Props) => {
  return (
    <div className="flex grow flex-col gap-4">
      <div className="rounded-lg bg-[#07202D] p-4 text-center text-xl font-semibold">
        Characters usage
      </div>
      <div className="rounded-md bg-[#07202D] p-4">
        <div className="pb-4 text-xl font-semibold">
          <span>{`Used characters: ${usedAsciiChars.length + nonAsciiChars.length}`}</span>
          {Boolean(nonAsciiChars.length) && (
            <>
              <span>{` (${usedAsciiChars.length}`}</span>
              <span className="text-rose-400">{` + ${nonAsciiChars.length}`}</span>
              <span>{`)`}</span>
            </>
          )}
        </div>
        <CharContainer chars={[...usedAsciiChars, ...nonAsciiChars]} />
      </div>
      <div className="rounded-md bg-[#07202D] p-4">
        <h1 className="pb-4 text-xl font-semibold">{`Spare characters (${nonUsedAsciiChars.length})`}</h1>
        <CharContainer chars={nonUsedAsciiChars} />
      </div>{' '}
    </div>
  )
}

export default UsedCharacters
