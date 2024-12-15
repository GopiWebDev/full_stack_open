import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';

import { PatientsWithoutSSN, Patient, NewPatientEntry } from '../types';

const getPatients = (): PatientsWithoutSSN[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
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
