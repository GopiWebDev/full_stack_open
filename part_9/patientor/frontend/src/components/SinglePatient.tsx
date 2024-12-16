import { useParams } from 'react-router-dom';
import patientServices from '../services/patients';
import diagnosesServices from '../services/diagnoses';
import { Patient, Diagnosis } from '../types';
import { useEffect, useState } from 'react';

const SinglePatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    patientServices.getById(id!).then((patient) => {
      setPatient(patient);
    });

    diagnosesServices.getAll().then((data) => setDiagnosis(data));
  }, [id]);

  if (!patient) return <div>Loading....</div>;

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>gender: {patient.gender}</p>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        <h3>Entries</h3>
        {patient.entries &&
          patient.entries.map(({ date, description, diagnosisCodes }) => {
            return (
              <div key={date}>
                <p>
                  {date}
                  {'  '}
                  {description}
                </p>
                <ul>
                  {diagnosisCodes &&
                    diagnosisCodes.map((code) => {
                      const hasCode = diagnosis?.filter((d) => {
                        return d.code === code;
                      });

                      return (
                        <li key={code}>
                          {hasCode && hasCode[0].code}
                          {'   '}
                          {hasCode && hasCode[0].name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SinglePatient;
