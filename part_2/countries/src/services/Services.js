import axios from 'axios'

const URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios.get(`${URL}/all`)
}

const getOne = (country) => {
  const request = axios.get(`${URL}/name/${country}`)
  return request.then((res) => res.data)
}

export default { getAll, getOne }
