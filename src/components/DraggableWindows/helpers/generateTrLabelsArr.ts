const up = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`
const propper = (text: string) =>
  text
    .split('_')
    .map((w) => up(w))
    .join(' ')

type obj = { [key: string]: string }
const generateTrLabelsArr = (o: obj) =>
  Object.keys(o).reduce((a, c) => [...a, { name: c, label: propper(c) }], [] as obj[])

export default generateTrLabelsArr
