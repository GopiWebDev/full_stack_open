import { useState } from 'react';
import { useParams } from 'react-router-dom';
import diagnoseServices from '../services/diagnoses';

const EntryForm = () => {
  const [type, setType] = useState<string>('HealthCheck');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCode, setDiagnosisCode] = useState<string>('');

  const [disDate, setDisDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');

  const [employerName, setEmployerName] = useState<string>('');
  const [sickStart, setSickStart] = useState<string>('');
  const [sickEnd, setSickEnd] = useState<string>('');

  const [rating, setRating] = useState<number>(0);
  const { id } = useParams();

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let entry = {};

    type === 'Hospital'
      ? (entry = {
          description,
          date,
          specialist,
          diagnosisCode,
          type,
          discharge: {
            date: disDate,
            criteria,
          },
        })
      : type === 'OccupationalHealthcare'
      ? (entry = {
          description,
          date,
          specialist,
          diagnosisCode,
          type,
          employerName,
          sickLeave: {
            startDate: sickStart,
            endDate: sickEnd,
          },
        })
      : (entry = {
          description,
          date,
          specialist,
          diagnosisCode,
          type,
          employerName,
          healthCheckRating: rating,
        });

    try {
      await diagnoseServices.create(id, entry);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Add Entry</h3>
      Type {'  '}
      <select
        defaultValue='HealthCheck'
        onChange={({ target }) => setType(target.value)}
      >
        Type
        <option value='HealthCheck'>Health Check</option>
        <option value='OccupationalHealthcare'>Occupational Healthcare</option>
        <option value='Hospital'>Hospital</option>
      </select>
      <form action='' onSubmit={submitForm}>
        <div>
          <label htmlFor='description'>description</label>
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            type='text'
            id='description'
            required
          />
        </div>

        <div>
          <label htmlFor='date'>Date</label>
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type='date'
            id='date'
            required
          />
        </div>

        <div>
          <label htmlFor='specialist'>specialist</label>
          <input
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            type='text'
            id='specialist'
            required
          />
        </div>

        <div>
          <label htmlFor='diagnosisCode'>Diagnosis Code</label>
          <input
            value={diagnosisCode}
            onChange={({ target }) => setDiagnosisCode(target.value)}
            type='text'
            id='diagnosisCode'
          />
        </div>

        {type === 'Hospital' ? (
          <div>
            <h3>Discharge Details</h3>
            <div>
              <label htmlFor='dischargeDate'>Discharge Date</label>
              <input
                value={disDate}
                onChange={({ target }) => setDisDate(target.value)}
                type='date'
                id='dischargeDate'
                required
              />
            </div>
            <div>
              <label htmlFor=''>Criteria</label>
              <input
                type='text'
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
                required
              />
            </div>
          </div>
        ) : type === 'OccupationalHealthcare' ? (
          <div>
            <div>
              <h3>Sick Leave</h3>
              <label htmlFor='startDate'>Start Date</label>
              <input
                value={sickStart}
                onChange={({ target }) => setSickStart(target.value)}
                type='date'
                id='startDate'
              />
              <label htmlFor='endDate'>End Date</label>
              <input
                value={sickEnd}
                onChange={({ target }) => setSickEnd(target.value)}
                type='date'
                id='endDate'
              />
            </div>
            <label htmlFor='employerName'>Employer Name</label>
            <input
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              type='text'
              id='employerName'
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor='healthRating'>Health Rating</label>
            <input
              value={rating}
              onChange={({ target }) => setRating(parseInt(target.value))}
              type='number'
              id='healthRating'
              max={3}
              min={0}
              required
            />
          </div>
        )}

        <button type='submit'>Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
