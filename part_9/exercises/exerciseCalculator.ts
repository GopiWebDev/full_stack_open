interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length

  let trainingDays = 0
  hours.map((day) => (day > 0 ? (trainingDays += 1) : 0))

  let success = true
  hours.map((day) => (day < target ? (success = false) : success))

  let rating = Math.ceil(trainingDays * 0.4)

  let ratingDescription = 'bad'
  if (rating === 2) ratingDescription = 'not too bad but could be better'
  else if (rating === 3) ratingDescription = 'good target achieved'

  const average =
    hours.reduce((prev: number, curr: number) => (prev += curr)) / 7

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
