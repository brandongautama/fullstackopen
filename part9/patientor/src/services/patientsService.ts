import patientData from '../../data/patients-full';

import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from '../types';

import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patientData.find(p => p.id === id);
  return entry;
};

export default { getEntries, getNonSensitiveEntries, addPatient, findById };
