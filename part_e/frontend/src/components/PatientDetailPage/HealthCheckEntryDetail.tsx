import { Diagnosis, HealthCheckEntry } from "../../types";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}

const HealthCheckEntryDetail = ({ entry, diagnoses }: Props) => {

    return (
        <div style={{border:"1px solid black", borderRadius:"10px", padding: "5px"}}>
            <p>{entry.date} <AssignmentTurnedInIcon /></p> 
            <p><i>{entry.description}</i></p>
            {entry.healthCheckRating==0 && <FavoriteIcon style={{color: "green"}}/>}
            {entry.healthCheckRating==1 && <FavoriteIcon style={{color: "yellow"}}/>}
            {entry.healthCheckRating==2 && <FavoriteIcon style={{color: "orange"}}/>}
            {entry.healthCheckRating==3 && <FavoriteIcon style={{color: "red"}}/>}
            <p>diagnose by {entry.specialist}</p>
            {entry.diagnosisCodes &&
                <ul>
                    {entry.diagnosisCodes.map(diagnosisCode => {
                        return (
                            <li key={diagnosisCode}>{diagnosisCode} {diagnoses.find((diagnose) => diagnose.code === diagnosisCode)?.name}</li>
                        )
                    })}
                </ul>
            }
        </div>
        
    );
};

export default HealthCheckEntryDetail;