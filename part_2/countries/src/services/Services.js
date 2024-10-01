import axios from 'axios';

const URL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = () => {
  return axios.get(URL);
};

const getOne = (country) => {
  const request = axios.get(`${URL}/api/name/${country}`);
  return request.then((res) => res.data);
};

export default { getAll, getOne };
