import diagnoses from '../services/diagnoses';
import { DiagnosesEntry, Entry, Patient } from '../types';
import { useParams } from 'react-router-dom';

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnosesEntry[];
}) => {
  return (
    <div>
      {entry.date} {entry.description}
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
