import axios from 'axios';

const URL = 'https://studies.cs.helsinki.fi/restcountries';

const getAll = () => {
  const request = axios.get(`${URL}/api/all`);
  return request.then((resolve) => resolve.data);
};

const getOne = (country) => {
  const request = axios.get(`${URL}/api/name/${country}`);
  return request.then((res) => res.data);
};

export default { getAll, getOne };
