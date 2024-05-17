import { Entry, Patient } from '../types';
import { useParams } from 'react-router-dom';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      {entry.date} {entry.description}
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </div>
  );
};

const PatientDetails = ({ patients }: { patients: Patient[] }) => {
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
          <EntryDetails key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
};

export default PatientDetails;
