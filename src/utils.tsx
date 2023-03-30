/*https://stackoverflow.com/a/46545530/1995055*/
export const shuffle = (array: Array<any>) => {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
