import axios from 'axios';
import { Diary, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((res) => res.data);
};

const addDiary = (object: NewDiaryEntry) => {
  return axios.post<Diary>(baseUrl, object).then((res) => res.data);
};

export { getDiaries, addDiary };
