import { DiagnosesEntry, Entry, Patient } from '../types';
import { useParams } from 'react-router-dom';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryRespectiveDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          Discharge criteria: {entry.discharge.criteria} date:{' '}
          {entry.discharge.date}
        </div>
      );
      break;
    case 'OccupationalHealthcare':
      return (
        <div>
          Employer: {entry.employerName} <br />
          SickLeave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate};
        </div>
      );
      break;
    case 'HealthCheck':
      return <div>HealthCheckRating: {entry.healthCheckRating};</div>;
      break;
    default:
      return assertNever(entry);
  }
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnosesEntry[];
}) => {
  return (
    <div>
      {entry.date} {entry.description} <br />
      diagnose by {entry.specialist}
      <EntryRespectiveDetails entry={entry} />
      <ul>
        {entry.diagnosisCodes?.map(code => {
          const currentDiagnoses = diagnoses.find(d => d.code === code);
          return (
            <li key={code}>
              {code} {currentDiagnoses?.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const PatientDetails = ({
  patients,
  diagnoses,
}: {
  patients: Patient[];
  diagnoses: DiagnosesEntry[];
}) => {
  const id = useParams().id;
  const patient = patients.find(p => p.id === id) as Patient;
  return (
    <div>
      <div>
        <h2>{patient.name}</h2>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </div>
      <div>
        <h3>entries</h3>
        {patient.entries.map(e => (
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default PatientDetails;
