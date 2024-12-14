import axios from 'axios';
import { Diary } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((res) => res.data);
};

export { getDiaries };
