import { parseExerciseArguments } from "./utils";

export interface RequestExercises {
    daily_exercises: number[];
    target: number;
}

export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number,
}

export const calculateExercises = (values: RequestExercises): Result => {

    if (values.daily_exercises.length === 0) throw new Error('No hours!');

    const avg: number = (values.daily_exercises.reduce((a, b) => a + b, 0) / values.daily_exercises.length) || 0;

    let rating: 1 | 2 | 3;
    let ratingText: string;

    if (avg > values.target) {
        rating = 1;
        ratingText = "very good";
    } else if (values.target - avg < values.target / 10) {
        rating = 2;
        ratingText = "not too bad but could be better";
    } else {
        rating = 3;
        ratingText = "bad";
    }

    return {
        periodLength: values.daily_exercises.length,
        trainingDays: values.daily_exercises.filter(x => x > 0).length,
        success: avg >= values.target ? true : false,
        rating: rating,
        ratingDescription: ratingText,
        target: values.target,
        average: avg,
    };
};

if (process.argv) {

    try {
        const { value1, value2 } = parseExerciseArguments(process.argv);
        console.log(calculateExercises({daily_exercises: value2, target: value1}));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }

} else {
    try {
        console.log(calculateExercises({daily_exercises: [3, 0, 2, 4.5, 0, 3, 1], target: 2}));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}