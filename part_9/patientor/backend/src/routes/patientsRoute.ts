import express, { Response } from 'express';
import patientsServices from '../services/patientsServices';
import { PatientsWithoutSSN } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientsWithoutSSN[]>) => {
  res.send(patientsServices.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsServices.addPatient(newPatientEntry);

    res.status(200).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
