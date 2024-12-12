import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRoute';
import patientsRouter from './routes/patientsRoute';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('Pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
