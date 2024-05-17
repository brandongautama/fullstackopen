import axios from 'axios';
import { DiagnosesEntry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<DiagnosesEntry[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export default {
  getAll,
};
