import { FaArrowLeft } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

function CountryDetail({
  viewCountry,
  formatNumberWithCommas,
  getCountryNamesByBorders,
  setIsDetail,
}) {
  return (
    <div className="country-detail-container">
      <div className="btn-container">
        <button
          onClick={() => {
            setIsDetail(false);
          }}
          className="back-btn"
        >
          <FaArrowLeft className="arrow-icon" />
          Back
        </button>
      </div>

      {viewCountry.map((country) => {
        return (
          <div key={uuidv4()} className="country-detail">
            <img
              className="flag-detail"
              src={country.flags.svg}
              alt={country.flags.alt}
            />
            <div className="country-stats">
              <h1 className="country-detail-h1">{country.name.official}</h1>
              <div className="country-stat-container">
                {" "}
                <div className="country-stat">
                  <p className="stat">
                    <b>Native Name: </b>
                    {
                      country.name.nativeName[
                        [Object.keys(country.name.nativeName)[0]]
                      ].official
                    }
                  </p>
                  <p className="stat">
                    <b>Population: </b>
                    {formatNumberWithCommas(country.population)}
                  </p>
                  <p className="stat">
                    <b>Region: </b>
                    {country.region}
                  </p>
                  <p className="stat">
                    <b>Sub Region: </b>
                    {country.subregion}
                  </p>
                  <p className="stat">
                    <b>Capital: </b>
                    {country.capital}
                  </p>
                </div>
                <div className="country-stat">
                  <p className="stat">
                    <b>Top Level Domain: </b>
                    {country.tld.length === 1
                      ? country.tld
                      : country.tld.map((value) =>
                          country.tld.indexOf(value) === country.tld.length - 1
                            ? value
                            : value + ", "
                        )}
                  </p>
                  <p className="stat">
                    <b>Currencies: </b>
                    {Object.values(country.currencies).map(
                      (currency, index) => (
                        <span key={index}>
                          {currency.name} ({currency.symbol})
                          {/* Format as you want */}
                          {index !==
                            Object.values(country.currencies).length - 1 &&
                            ", "}
                        </span>
                      )
                    )}
                  </p>
                  <p className="stat">
                    <b>Languages: </b>
                    {Object.values(country.languages).map((language, index) => (
                      <span key={index}>
                        {language}
                        {/* Format as you want */}
                        {index !==
                          Object.values(country.languages).length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="bordering-countries">
                <h1 className="country-detail-h1">Border Countries:</h1>
                <div className="border-btn-container">
                  {country.borders ? (
                    getCountryNamesByBorders(country.borders)
                  ) : (
                    <p>No data</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

CountryDetail.propTypes = {
  viewCountry: PropTypes.array,
  formatNumberWithCommas: PropTypes.func,
  getCountryNamesByBorders: PropTypes.func,
};

export default CountryDetail;
