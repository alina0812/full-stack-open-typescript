interface TotalProps {
    courseParts: Course[];
}

interface Course {
    name: string;
    exerciseCount: number;
}

const Total = (props: TotalProps): JSX.Element => {

    const totalExercises = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <p>Number of exercises {totalExercises}</p>
    );
};

export default Total;