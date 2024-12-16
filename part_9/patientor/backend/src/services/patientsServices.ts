import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';

import { Patient, NewPatientEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
        ssn,
      };
    }
  );
};

const addPatient = (details: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...details,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatientsWithId = (id: string): Patient | string => {
  const patient = patients.find((p) => p.id === id);
  return patient ? patient : '';
};

export default { getPatients, addPatient, getPatientsWithId };
