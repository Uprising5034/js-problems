const regex = new RegExp(/\nGrid \d\d\n/)
const inputArray = input.split(regex)

inputArray[0] = inputArray[0].substring(8)

const PUZZLES = inputArray.map(puzzle => puzzle.replaceAll("\n", ""))
