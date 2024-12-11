import isNotNumber from './utils'

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseArgs = (args: string[]) => {
  if (args.length < 8) throw new Error('Not enough args')

  let daysArray = []
  let start = 3

  while (args[start]) {
    daysArray.push(Number(args[start]))
    start++
  }

  let allNumbers = true
  daysArray.map((day) => {
    if (isNotNumber(day)) allNumbers = false
  })

  if (allNumbers) {
    return {
      days: daysArray,
      target: Number(args[2]),
    }
  } else {
    throw new Error('Provided values were not numbers')
  }
}

const calculateExercises = (days: number[], target: number): Result => {
  const periodLength = days.length

  let trainingDays = 0
  days.map((day) => (day > 0 ? (trainingDays += 1) : 0))

  let success = true
  days.map((day) => (day < target ? (success = false) : success))

  let avg = 3 / periodLength
  let rating = Math.ceil(trainingDays * avg)

  let ratingDescription = 'bad'
  if (rating === 2) ratingDescription = 'not too bad but could be better'
  else if (rating === 3) ratingDescription = 'good target achieved'

  const average =
    days.reduce((prev: number, curr: number) => (prev += curr)) / periodLength

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { days, target } = parseArgs(process.argv)

  console.log(calculateExercises(days, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
