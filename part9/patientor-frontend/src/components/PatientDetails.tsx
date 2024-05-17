import { Patient } from '../types';
import { useParams } from 'react-router-dom';

const PatientDetails = ({ patients }: { patients: Patient[] }) => {
  const id = useParams().id;
  const patient = patients.find(p => p.id === id) as Patient;
  return (
    <div>
      <h2>{patient.name}</h2>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
    </div>
  );
};

export default PatientDetails;
