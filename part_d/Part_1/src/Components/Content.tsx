import Part from "./Part";

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {

    return (
        <>
            {props.courseParts.map((item) => {
                return (
                    <p key={item.name}><b>
                        {item.name} {item.exerciseCount}</b>
                        <br />
                        <Part part={item}/>
                    </p>
                )
            })}
        </>
    )

};

export default Content;