export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type Gender = 'male' | 'female';

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
