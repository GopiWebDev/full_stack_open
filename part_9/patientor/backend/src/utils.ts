import { NewPatientEntry, Gender } from './types';
import z from 'zod';

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const parseName = (name: unknown): string => {
//   if (!name || !isString(name)) {
//     throw new Error('Incorrect or missing name');
//   }
//   return name;
// };

// const parseSSN = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)) {
//     throw new Error('Incorrect or missing ssn');
//   }
//   return ssn;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error('Incorrect or missing occupation');
//   }
//   return occupation;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error('Incorrect or missing date: ' + date);
//   }
//   return date;
// };

// const isGender = (str: string): str is Gender => {
//   return Object.values(Gender)
//     .map((g) => g.toString())
//     .includes(str);
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error('Incorrect or missing gender: ' + gender);
//   }
//   return gender;
// };

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchema.parse(object);
};

export default toNewPatientEntry;
