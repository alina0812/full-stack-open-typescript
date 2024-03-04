import { Diagnosis, Entry, HealthCheckEntryFormValues, HospitalEntryFormValues, OccupationalHealthcareEntryFormValues, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { apiBaseUrl } from "../../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HospitalEntry from "./HospitalEntryDetail";
import HealthCheckEntry from "./HealthCheckEntryDetail";
import OccupationalHealthcareEntryDetail from "./OccupationalHealthcareEntryDetail";
import { Alert, Button, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, Typography, useTheme } from "@mui/material";
import patientService from "../../services/patients";

interface Props {
    diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {

    const params = useParams();
    const [patient, setPatient] = useState<Patient>()

    const [type, setType] = useState<string>("HealthCheck");

    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState<string>('');
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
    const [employerName, setEmployerName] = useState<string>('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');

    

    const [error, setError] = useState<string>();

    useEffect(() => {
        axios.get<Patient>(`${apiBaseUrl}/patients/${params.id}`)
            .then(res => {
                setPatient(res.data)
            })
    }, [params.id]);

    const submitNewPatientEntry = async () => {
        if (type == "HealthCheck") {
            if (typeof Number(rating)) {
                try {
                    const values: HealthCheckEntryFormValues = {
                        description: description,
                        type: "HealthCheck",
                        date: date,
                        specialist: specialist,
                        healthCheckRating: Number(rating),
                        diagnosisCodes: diagnosisCodes,
                    }

                    const entry = await patientService.createEntry(values, params.id!);
                    setError('');
                    clearForm();
                    setPatient(entry);


                } catch (e: unknown) {
                    if (axios.isAxiosError(e)) {
                        if (e?.response?.data && typeof e?.response?.data === "string") {
                            const message = e.response.data.replace('Something went wrong. Error: ', '');
                            console.error(message);
                            setError(message);
                        } else {
                            setError("Unrecognized axios error");
                        }
                    } else {
                        console.error("Unknown error", e);
                        setError("Unknown error");
                    }
                }
            } else {
                setError('Rating is not a number')
            }

        } else if (type == "Hospital") {
            try {
                const values: HospitalEntryFormValues = {
                    description: description,
                    type: "Hospital",
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: diagnosisCodes,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria,
                    }
                }

                const entry = await patientService.createEntry(values, params.id!);
                setError('');
                clearForm();
                setPatient(entry);


            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === "string") {
                        const message = e.response.data.replace('Something went wrong. Error: ', '');
                        console.error(message);
                        setError(message);
                    } else {
                        setError("Unrecognized axios error");
                    }
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        } else if (type == "OccupationalHealthcare") {
            try {
                if (sickLeaveStartDate !== '' && sickLeaveEndDate != '') {
                    var values: OccupationalHealthcareEntryFormValues = {
                        description: description,
                        type: "OccupationalHealthcare",
                        date: date,
                        specialist: specialist,
                        diagnosisCodes: diagnosisCodes,
                        employerName: employerName,
                        sickLeave: {
                            startDate: sickLeaveStartDate,
                            endDate: sickLeaveEndDate,
                        }
                    }
                } else {
                    values = {
                        description: description,
                        type: "OccupationalHealthcare",
                        date: date,
                        specialist: specialist,
                        diagnosisCodes: diagnosisCodes,
                        employerName: employerName,
                    }
                }

                const entry = await patientService.createEntry(values, params.id!);
                setError('');
                clearForm();
                setPatient(entry);


            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === "string") {
                        const message = e.response.data.replace('Something went wrong. Error: ', '');
                        console.error(message);
                        setError(message);
                    } else {
                        setError("Unrecognized axios error");
                    }
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }


    };

    const clearForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setRating('');
        setDiagnosisCodes([]);
        setDischargeCriteria('');
        setDischargeDate('');
        setEmployerName('');
        setSickLeaveStartDate('');
        setSickLeaveEndDate('');
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        submitNewPatientEntry();
    }

    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisCodes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const theme = useTheme();

    function getStyles(name: string, personName: string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };



    if (patient) {
        return (
            <div className="App">
                <h1>{patient.name}
                    {patient.gender == "male" && <MaleIcon />}
                    {patient.gender == "female" && <FemaleIcon />}
                    {patient.gender == "other" && <TransgenderIcon />}
                </h1>
                <div>Date of Birth: {patient.dateOfBirth}</div>
                <div>ssn: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>

                <div style={{ border: "1px solid black", borderRadius: "10px", padding: "10px", borderStyle: "dotted", margin: "5px" }}>
                    <h3>New Healthcheck entry</h3>
                    <form>
                        {error && <Alert severity="error">
                            {error}
                        </Alert>}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={e => {
                                e.preventDefault();
                                setRating('');
                                setDischargeCriteria('');
                                setDischargeDate('');
                                setEmployerName('');
                                setSickLeaveEndDate('');
                                setSickLeaveStartDate('');
                                setType(e.target.value)
                            }}
                        >
                            <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                            <MenuItem value={"Hospital"}>Hospital</MenuItem>
                            <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
                        </Select>
                        <TextField label="Description" variant="standard" fullWidth style={{ padding: "5px" }} value={description} onChange={e => setDescription(e.target.value)} />
                        <TextField label="Date" variant="standard" type="date" fullWidth style={{ padding: "5px" }} value={date} onChange={e => setDate(e.target.value)} />
                        <TextField label="Specialist" variant="standard" fullWidth style={{ padding: "5px" }} value={specialist} onChange={e => setSpecialist(e.target.value)} />
                        {type == "HealthCheck" && <TextField label="HealthCheckRating" variant="standard" fullWidth style={{ padding: "5px" }} value={rating} onChange={e => setRating(e.target.value)} />}
                        {type == "Hospital" && <>
                            <Typography variant="h6">Discharge</Typography>
                            <TextField label="Date" variant="standard" type="date" fullWidth style={{ padding: "5px" }} value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} />
                            <TextField label="Criteria" variant="standard" fullWidth style={{ padding: "5px" }} value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} />
                        </>}
                        {type == "OccupationalHealthcare" && <>
                            <TextField label="Employer name" variant="standard" fullWidth style={{ padding: "5px" }} value={employerName} onChange={e => setEmployerName(e.target.value)} />
                            <Typography variant="h6">Sickleave</Typography>
                            <TextField label="Start date" variant="standard" type="date" fullWidth style={{ padding: "5px" }} value={sickLeaveStartDate} onChange={e => setSickLeaveStartDate(e.target.value)} />
                            <TextField label="End date" variant="standard" type="date" fullWidth style={{ padding: "5px" }} value={sickLeaveEndDate} onChange={e => setSickLeaveEndDate(e.target.value)} />
                        </>}
                        <Select
                            label="Test"
                            id="demo-multiple-name"
                            multiple
                            value={diagnosisCodes}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                            style={{width:"100%"}}
                        >
                            {diagnoses.map((diagnose) => (
                                <MenuItem
                                    key={diagnose.code}
                                    value={diagnose.code}
                                    style={getStyles(diagnose.name, diagnosisCodes, theme)}
                                >
                                    {diagnose.code}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button variant="outlined" color="secondary" type="submit" onClick={e => {
                            e.preventDefault();
                            clearForm();
                        }
                        }>Cancel</Button>
                        <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>Add</Button>
                    </form>
                </div>

                <h2>entries</h2>
                {Object.values(patient.entries).map((entry: Entry) => {
                    switch (entry.type) {
                        case "Hospital":
                            return <div key={entry.id}><HospitalEntry entry={entry} diagnoses={diagnoses} /></div>
                        case 'OccupationalHealthcare':
                            return <div key={entry.id}><OccupationalHealthcareEntryDetail entry={entry} diagnoses={diagnoses} /></div>
                        case "HealthCheck":
                            return <div key={entry.id}><HealthCheckEntry entry={entry} diagnoses={diagnoses} /></div>
                        default:
                            return <></>
                    }

                })}
            </div>
        );
    }
};

export default PatientDetailPage;
