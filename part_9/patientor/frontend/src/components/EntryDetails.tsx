import {
  Entry,
  HospitalEntry as HospitalEntrySchema,
  HealthCheckEntry as HealthCheckEntrySchema,
  OccupationalHealthcareEntry,
} from '../types';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntry entry={entry} />;
    default:
      break;
  }
};

const HospitalEntry = ({ entry }: { entry: HospitalEntrySchema }) => {
  return (
    <div style={{ border: '2px solid black', margin: '10px' }}>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <div>
        <p>Discharged on {entry.discharge.date}</p>
        <p>Reason on {entry.discharge.criteria}</p>
      </div>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntrySchema }) => {
  return (
    <div style={{ border: '2px solid black', margin: '10px' }}>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>{entry.healthCheckRating}</p>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

const OccupationalEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div style={{ border: '2px solid black', margin: '10px' }}>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default EntryDetails;
