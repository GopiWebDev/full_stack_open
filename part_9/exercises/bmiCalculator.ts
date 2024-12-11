const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height / 100
  const result = weight / (heightInMeter * heightInMeter)

  if (result < 18.4) {
    return 'Underweight'
  } else if (result >= 18.5 && result <= 24.9) {
    return 'Normal range'
  } else if (result >= 25 && result < 29.9) {
    return 'Overweight'
  } else if (result >= 30) {
    return 'Obese '
  }
}

console.log(calculateBmi(180, 74))
