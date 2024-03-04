import { calculateBmiAPI } from './bmiCalculator';
import {Request, Response} from 'express';
import { RequestExercises, Result, calculateExercises } from './exerciseCalculator';
import { parseExerciseArgumentsAPI } from './utils';
import { Express } from "express";
import express from 'express';

const app: Express = express();

app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
    res.send('pong');
});

app.get('/hello', (_req: Request, res: Response) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (_req: Request, res: Response) => {
    const height = _req.query.height;
    const weight = _req.query.weight;

    if(!height) {
        res.status(400);
        res.send({
            error: 'Height parameter is missing'
          });
    } else if (!weight) {
        res.status(400);
        res.send({
            error: 'Weight parameter is missing'
          });

    } else {
        try {
            const bmi = calculateBmiAPI([String(height), String(weight)]);
            res.status(200);
            res.send({
                weight: weight,
                height: height,
                bmi: bmi,
              });
        } catch (error: unknown) {
            let errorMessage = '';
            if (error instanceof Error) {
                errorMessage += error.message;
            }
            res.status(500);
            res.send({
                error: errorMessage
              });
        }
    }
});

app.post('/exercises', (_req: Request, res: Response) => {
    const exercises: RequestExercises = _req.body as RequestExercises;
    const parse = parseExerciseArgumentsAPI(exercises);
    if(exercises.daily_exercises == undefined) {
        res.status(500);
            res.send({
                error: 'parameters missing'
              });
    } else if(exercises.target == undefined) {
        res.status(500);
            res.send({
                error: 'parameters missing'
              });
    } else if(parse != "") {
        res.status(500);
            res.send({
                error: "malformatted parameters"
              });
    } else {
        const result: Result = calculateExercises(exercises);
        res.json(result);
    }


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});