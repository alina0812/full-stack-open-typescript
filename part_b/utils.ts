import { RequestExercises } from './exerciseCalculator';

interface BMIValues {
    value1: number;
    value2: number;
}

interface ExerciseValues {
    value1: number;
    value2: number[];
}

export const parseBMIArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const parseBMIArgumentsAPI = (args: string[]): BMIValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
        return {
            value1: Number(args[0]),
            value2: Number(args[1])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('malformatted parameters');

    let x = 2;

    while (x < args.length) {
        const arg = args[x];
        if (isNaN(Number(arg))) {
            throw new Error('malformatted parameters');
        }
        x += 1;
    }

    return {
        value1: Number(args[2]),
        value2: args.slice(3,args.length).map(Number)
    };
};

export const parseExerciseArgumentsAPI = (args: RequestExercises) => {

    for(const exercise of args.daily_exercises) {
        if(isNaN(exercise)){
            return "malformatted parameters";
        }
    }


    if(isNaN(args.target)){
        return "malformatted parameters";
    }
    return "";

};

export default "this is the default...";