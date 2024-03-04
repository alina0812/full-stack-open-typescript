import patientData from '../../data/patients';
import { EntryWithoutId, NewPatient, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(d => d.id === id);
    console.log(entry?.entries);
    return entry;
};

const addPatient = (entry: NewPatient): Patient => {

    const newPatient = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

const addPatientEntry = (entry: EntryWithoutId, id: string): Patient => {

    const newEntry = {
        id: uuid(),
        ...entry
    };

    var patient  = patients.find(v => v.id === id)!;

    patient.entries.push(newEntry);

    return patient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    addPatientEntry,
    findById
};