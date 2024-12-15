export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientsWithoutSSN = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
