type Props = {
  text: string
  onChange?: React.Dispatch<React.SetStateAction<string>>
}

const TextArea = (props: Props) => {
  return (
    <textarea
      value={props.text}
      readOnly={!props.onChange}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      className='m-0 grow font-sans resize-none bg-transparent px-4 text-sm text-neutral-400 focus:border-none focus:outline-none'
    />
  )
}

export default TextArea
