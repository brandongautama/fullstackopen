import express from 'express';

import {parseArguments, calculateBmi} from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const heightParam: string = String(req.query.height);
    const weightParam: string = String(req.query.weight);
    try{
        const {height, weight} = parseArguments(['dummy', 'dummy', heightParam, weightParam])
        const bmiRating: string = calculateBmi(height, weight)
        res.send({
            weight: weight,
            height: height,
            bmi: bmiRating
        })
    } catch (error: unknown) {
        res.send({
            error: 'malformatted parameters'
        })
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})