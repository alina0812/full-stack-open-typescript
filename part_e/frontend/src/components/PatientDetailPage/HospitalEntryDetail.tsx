import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}

const HospitalEntryDetail = ({ entry, diagnoses }: Props) => {

    return (
        <div style={{border:"1px solid black", borderRadius:"10px", padding: "5px"}}>
            <p>{entry.date} <LocalHospitalIcon /></p> 
            <p><i>{entry.description}</i></p>
            <p>Discharge on {entry.discharge.date} because: {entry.discharge.criteria}</p>
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

export default HospitalEntryDetail;