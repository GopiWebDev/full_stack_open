import axios from 'axios';
import { Diagnosis, EntryWithoutId } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const create = async (id: string | undefined, entry: EntryWithoutId) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};

export default { getAll, create };
