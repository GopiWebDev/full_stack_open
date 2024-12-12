import express, { Response, Request } from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { calculator, Operator } from './calculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req: Request, res: Response): any => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (
    Number.isNaN(heightNum) ||
    Number.isNaN(weightNum) ||
    heightNum <= 0 ||
    weightNum <= 0
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateBmi(heightNum, weightNum);

  if (result === 'Invalid') {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({
    weight,
    height,
    bmi: result,
  });
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  const result = calculator(Number(value1), Number(value2), op as Operator);
  res.send({ result });
});

app.post('/exercises', (req, res): any => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (daily_exercises.length < 7 || typeof target !== 'number')
    return res.status(400).json({ error: 'malformatted parameters' });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target));
  return res.send({ result });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
