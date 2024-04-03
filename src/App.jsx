import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Select from "./Select";
import CountryDetail from "./CountryDetail";
import CountryCards from "./CountryCards";
import useSWRImmutable from "swr/immutable";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [seeOptions, setSeeOptions] = useState(false);
  const [region, setRegion] = useState("");
  // const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [viewCountry, setViewCountry] = useState([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWRImmutable(
    "https://restcountries.com/v3.1/all",
    fetcher
  );

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const filterData = () => {
      const filtered = data.filter((country) =>
        country.name.official.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredData(filtered);
    };

    const delayedFilter = debounce(filterData, 700);
    delayedFilter();

    return () => clearTimeout(delayedFilter);
  }, [inputValue, data]);

  useEffect(() => {
    const handleClickOutsideAndScroll = (event) => {
      if (
        regionOptionRef.current &&
        !regionOptionRef.current.contains(event.target)
      ) {
        setSeeOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideAndScroll);
    window.addEventListener("scroll", handleClickOutsideAndScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAndScroll);
      window.removeEventListener("scroll", handleClickOutsideAndScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); //add this
    }
    setDarkMode(!darkMode);
  };

  const regionOptionRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterDataByRegion = (region) => {
    const newData = data.filter((country) => {
      return country.region.toLowerCase().includes(region);
    });
    setFilteredData(newData);
  };

  const getCountryNamesByBorders = (borders) => {
    console.log(borders);
    const resultArray = [];
    for (const border of borders) {
      const country = data.find((country) => country.cioc === border);
      if (country) {
        resultArray.push(country.name.official);
      }
    }
    console.log(resultArray);

    return resultArray.map((countryName, index) => (
      <button
        onClick={() => {
          showDetail(countryName);
        }}
        className="border-btn"
        key={index}
      >
        {countryName}
      </button>
    ));
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const showDetail = (countryName) => {
    setViewCountry(
      data.filter(
        (country) =>
          country.name.official.toLowerCase() === countryName.toLowerCase()
      )
    );

    setIsDetail(true);
  };

  const regionOptions = ["africa", "america", "asia", "europe", "oceania"];

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {!isDetail && (
        <div className="inputs">
          <Nav
            darkMode={darkMode}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
          <Select
            seeOptions={seeOptions}
            setSeeOptions={setSeeOptions}
            regionOptionRef={regionOptionRef}
            regionOptions={regionOptions}
            setRegion={setRegion}
            filterDataByRegion={filterDataByRegion}
          />
        </div>
      )}
      {isLoading ? (
        <ClipLoader
          className="loader"
          color={"black"}
          loading={isLoading}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : isDetail ? (
        <CountryDetail
          viewCountry={viewCountry}
          formatNumberWithCommas={formatNumberWithCommas}
          getCountryNamesByBorders={getCountryNamesByBorders}
          setIsDetail={setIsDetail}
        />
      ) : (
        <CountryCards
          filteredData={filteredData}
          showDetail={showDetail}
          formatNumberWithCommas={formatNumberWithCommas}
        />
      )}
    </>
  );
}

export default App;
