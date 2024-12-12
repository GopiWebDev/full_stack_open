import express, { Response } from 'express';
import patientsServices from '../services/patientsServices';
import { PatientsWithoutSSN } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientsWithoutSSN[]>) => {
  res.send(patientsServices.getPatients());
});

export default router;
