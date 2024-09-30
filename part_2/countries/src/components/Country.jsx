const Country = ({ country }) => {
  console.log(country[0]);

  country = country[0];

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((lang) => {
            return <li key={lang}>{lang}</li>;
          })}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    </>
  );
};

export default Country;
