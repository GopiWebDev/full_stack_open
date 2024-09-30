import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

const App = () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all';

  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  const fetchInfo = () => {
    return axios.get(url).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchInfo().then(() => console.log('Data Loaded'));
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const filteredData = data.filter((data) => {
    if (name.length < 1) return;
    return data.name.common.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <>
      <div>
        Find countries <input value={name} onChange={handleNameChange} />
      </div>
      {filteredData.length > 10 ? (
        'Too many matches, specify another filter'
      ) : filteredData.length === 1 ? (
        <Country country={filteredData} />
      ) : (
        filteredData.map((dataObj, i) => {
          return (
            <p key={dataObj.name.common}>
              {i + 1}. {dataObj.name.common} <button>show</button>
            </p>
          );
        })
      )}
    </>
  );
};

export default App;

