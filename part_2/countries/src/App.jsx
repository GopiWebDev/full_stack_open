import { useEffect, useState } from 'react';
import Country from './components/Country';
import Services from './services/Services';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(null);

  useEffect(() => {
    Services.getAll()
      .then((res) => {
        setData(res.data);
      })
      .then(() => console.log('Data Loaded'));
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const filteredData = data.filter((data) => {
    if (name.length < 1) return;
    return data.name.common.toLowerCase().includes(name.toLowerCase());
  });

  const handleClick = (countryName) => {
    setShow(show === countryName ? null : countryName);
  };

  return (
    <>
      <div>
        Find countries <input value={name} onChange={handleNameChange} />
      </div>
      {filteredData.length > 10 ? (
        'Too many matches, specify another filter'
      ) : filteredData.length === 1 ? (
        <Country country={filteredData[0]} />
      ) : (
        filteredData.map((dataObj, i) => {
          return (
            <div key={dataObj.name.common}>
              <p>
                {i + 1}. {dataObj.name.common}{' '}
                <button onClick={() => handleClick(dataObj.name.common)}>
                  {show === dataObj.name.common ? 'hide' : 'show'}
                </button>
              </p>
              {show === dataObj.name.common && (
                <Country country={dataObj} show={true} />
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default App;

