import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetail = ({ entry, diagnoses }: Props) => {

    return (
        <div style={{border:"1px solid black", borderRadius:"10px", padding: "5px"}}>
            <p>{entry.date} <MedicalInformationIcon /> <i>{entry.employerName}</i></p> 
            <p><i>{entry.description}</i></p>
            {entry.sickLeave && <p>sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
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

export default OccupationalHealthcareEntryDetail;