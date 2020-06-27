export const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
]

export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
