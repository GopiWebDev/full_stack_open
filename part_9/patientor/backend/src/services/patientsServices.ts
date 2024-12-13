import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';

import { PatientsWithoutSSN, Patient, NewPatientEntry } from '../types';

const getPatients = (): PatientsWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (details: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...details,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
