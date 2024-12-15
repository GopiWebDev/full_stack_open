import { useParams } from 'react-router-dom';
import patientServices from '../services/patients';
import { Patient } from '../types';
import { useEffect, useState } from 'react';

const SinglePatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    patientServices.getById(id).then((patient) => {
      setPatient(patient);
    });
  }, [id]);

  if (!patient) return <div>Loading....</div>;

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>gender: {patient.gender}</p>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default SinglePatient;
