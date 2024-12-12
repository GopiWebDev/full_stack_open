import patients from '../../data/patients';

import { PatientsWithoutSSN } from '../types';

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

export default { getPatients };
