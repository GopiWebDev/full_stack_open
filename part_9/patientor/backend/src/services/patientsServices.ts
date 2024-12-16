import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';

import { Patient, NewPatientEntry, Entry, EntryWithoutId } from '../types';

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

const getPatientsEntryWithId = (id: string): Entry[] | [] => {
  const patient = patients.find((p) => p.id === id);
  return patient ? patient.entries : [];
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = patients.find((p) => p.id === id);

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatientsWithId,
  getPatientsEntryWithId,
  addEntry,
};
