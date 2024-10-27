import CharCard, { CharCardProps } from './CharCard'

type Props = {
  chars: CharCardProps[]
}

const CharContainer = ({ chars }: Props) => {
  return (
    <div className="flex flex-wrap font-sans">
      {chars.map((char, i) => (
        <CharCard key={`${char.usecase}-${i}`} unicode={char.unicode} usecase={char.usecase} />
      ))}
    </div>
  )
}

export default CharContainer
