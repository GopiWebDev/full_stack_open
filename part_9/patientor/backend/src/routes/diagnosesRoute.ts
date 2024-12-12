import express, { Response } from 'express';
import diagnoseService from '../services/daignoseServices';
import { Diagnoses } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnoses[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
