import { Diagnosis, Discharge, Entry, EntryWithoutId, Gender, HealthCheckEntryWithoutId, HealthCheckRating, HospitalEntryWithoutId, NewDiaryEntry, NewPatient, OccupationalHealthcareEntryWithoutId, SickLeave, Visibility, Weather } from './types';

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: NewDiaryEntry = {
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            date: parseDate(object.date),
            comment: parseComment(object.comment)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newEntry: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: <Entry[]>object.entries
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewPatientEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object) {
        if(object.type=="HealthCheck" && 'healthCheckRating' in object){
            const newEntry: HealthCheckEntryWithoutId = {
                date: parseDate(object.date),
                description: parseDescription(object.description),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object),
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            }
            return newEntry;
        } else if(object.type=='OccupationalHealthcare' && 'employerName' in object){
            if('sickLeave' in object) {
                const newEntry: OccupationalHealthcareEntryWithoutId= {
                    date: parseDate(object.date),
                    description: parseDescription(object.description),
                    specialist: parseSpecialist(object.specialist),
                    diagnosisCodes: parseDiagnosisCodes(object),
                    type: 'OccupationalHealthcare',
                    employerName: parseEmployerName(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                }
                return newEntry;

            } else {
                const newEntry: OccupationalHealthcareEntryWithoutId= {
                    date: parseDate(object.date),
                    description: parseDescription(object.description),
                    specialist: parseSpecialist(object.specialist),
                    diagnosisCodes: parseDiagnosisCodes(object),
                    type: 'OccupationalHealthcare',
                    employerName: parseEmployerName(object.employerName)
                }
                return newEntry;
            }
        } else if(object.type=='Hospital' && 'discharge' in object){
            const newEntry: HospitalEntryWithoutId= {
                date: parseDate(object.date),
                description: parseDescription(object.description),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object),
                type: 'Hospital',
                discharge: parseDischarge(object.discharge)
            }
            return newEntry;
        }
        else {
            throw new Error('Incorrect data: type not existent');
        }

        
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }

    return comment;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
};

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }

    return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName');
    }

    return employerName;
};

const parseSickLeave = (sickLeave: unknown) : SickLeave => {
    if(!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
        throw new Error('Incorrect or missing sickLeave');
    } else {
        const newEntry: SickLeave = { 
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate)

        }
        return newEntry;
    }
}

const parseDischarge = (discharge: unknown): Discharge => {
    if(!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
        throw new Error('Incorrect or missing discharge');
    } else {
        const newEntry: Discharge = {
            date: parseDate(discharge.date),
            criteria: parseCriteria(discharge.criteria)
        }
        return newEntry;
    }
}

const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria');
    }

    return criteria;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || isNaN(Number(healthCheckRating))|| !isHealthCheckRating(Number(healthCheckRating))) {
        throw new Error('Incorrect or missing healthCheckRating');
    }
    return Number(healthCheckRating);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v.toString()).includes(param.toString());
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};