import { parseBMIArguments, parseBMIArgumentsAPI } from "./utils";

const calculateBmi = (height: number, weight: number): string => {

    if (height === 0) throw new Error('Can\'t divide by 0!');

    const bmi: number = weight / ((height / 100) ^ 2);

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else if (bmi > 30 && bmi < 35) {
        return "Obese (Class 1)";
    } else if (bmi > 35 && bmi < 40) {
        return "Obese (Class 2)";
    } else {
        return "Obese (Class 3)";
    }
};

export const calculateBmiAPI = (args: string[]): string => {
    const { value1, value2 } = parseBMIArgumentsAPI(args);
    return calculateBmi(value1, value2);
};

if (process.argv) {
    try {
        const { value1, value2 } = parseBMIArguments(process.argv);
        console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }

} else {
    try {
        console.log(calculateBmi(180, 74));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}