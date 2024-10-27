export const objectToArray = (o: { [key: string]: any }) => Object.entries(o).map(([key, value]) => ({ key, value }))
