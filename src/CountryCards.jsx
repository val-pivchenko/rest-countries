import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

function CountryCards({ filteredData, showDetail, formatNumberWithCommas }) {
  return (
    <div className="card-container">
      {filteredData.map((country) => {
        return (
          <div
            key={uuidv4()}
            className="country-card"
            onClick={() => {
              showDetail(country.name.official);
            }}
          >
            <img
              className="flag"
              src={country.flags.svg}
              alt={country.flags.alt}
            />
            <h1 className="country-name">{country.name.official}</h1>
            <div className="stats">
              <p className="stat">
                <b>Population: </b>
                {formatNumberWithCommas(country.population)}
              </p>
              <p className="stat">
                <b>Region: </b>
                {country.region}
              </p>
              <p className="stat">
                <b>Capital: </b>
                {country.capital}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

CountryCards.propTypes = {
  filteredData: PropTypes.array,
  showDetail: PropTypes.func,
  formatNumberWithCommas: PropTypes.func,
};

export default CountryCards;
