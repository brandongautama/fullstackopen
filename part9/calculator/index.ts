import express from 'express';

import { parseArguments, calculateBmi } from './bmiCalculator';
import { parseArguments2, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightParam: string = String(req.query.height);
  const weightParam: string = String(req.query.weight);
  try {
    const { height, weight } = parseArguments([
      'dummy',
      'dummy',
      heightParam,
      weightParam,
    ]);
    const bmiRating: string = calculateBmi(height, weight);
    res.send({
      weight: weight,
      height: height,
      bmi: bmiRating,
    });
  } catch (error: unknown) {
    res.send({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.send({
      error: 'parameters missing',
    });
  }

  try {
    const args = parseArguments2([
      'dummy',
      'dummy',
      target as string,
      ...(daily_exercises as string[]),
    ]);
    const response = calculateExercises(args.dailyExerciseHours, args.target);
    res.send(response);
  } catch (error: unknown) {
    res.send({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
