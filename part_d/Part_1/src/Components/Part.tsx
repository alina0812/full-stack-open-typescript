interface PartProps {
    part: CoursePart;
}

const Part = (props: PartProps): JSX.Element => {

    switch (props.part.kind) {
        case "basic":
            return (<>
                {props.part.description && <i>{props.part.description} <br /></i>}
            </>);
        case "group":
            return <>project exercises {props.part.groupProjectCount}</>

        case "special":
            return <>{props.part.description && <i>{props.part.description} <br /></i>}
            required skills:{' '}
            {props.part.requirements.map((item, index) => {
                return (<>{ (index ? ', ' : '') + item}</>)})}
            </>
        default:
            return <>{props.part.description && <i>{props.part.description} <br /></i>}
                submit to {props.part.backgroundMaterial}</>
    }

};

export default Part;