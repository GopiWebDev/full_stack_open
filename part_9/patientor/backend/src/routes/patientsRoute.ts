import express, { NextFunction, Request, Response } from 'express';
import patientsServices from '../services/patientsServices';
import { NewPatientEntry, Patient, Entry, EntryWithoutId } from '../types';
import { EntriesParser, newEntrySchema } from '../utils';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientsServices.getPatients());
});

router.get(
  '/:id',
  (req, res: Response<Patient | string>, next: NextFunction) => {
    try {
      const patient = patientsServices.getPatientsWithId(req.params.id);
      res.send(patient);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id/entries',
  (req, res: Response<Entry[] | []>, next: NextFunction) => {
    try {
      const patient = patientsServices.getPatientsEntryWithId(req.params.id);

      res.send(patient);
    } catch (error) {
      next(error);
    }
  }
);

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NewPatientEntry>
  ) => {
    const addedEntry = patientsServices.addPatient(req.body);
    res.json(addedEntry);
  }
);

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntriesParser.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry>
  ) => {
    const added = patientsServices.addEntry(req.params.id, req.body);
    console.log(added);
    res.send(added);
  }
);

router.use(errorMiddleware);

export default router;
