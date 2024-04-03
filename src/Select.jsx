import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

function Select({
  seeOptions,
  setSeeOptions,
  regionOptionRef,
  regionOptions,
  setRegion,
  filterDataByRegion,
}) {
  return (
    <div className="select-container">
      <button className="btn-region" onClick={() => setSeeOptions(!seeOptions)}>
        Filter by Region
        <IoIosArrowDown />
      </button>
      <div
        ref={regionOptionRef}
        className={`region-options ${seeOptions ? "" : "hidden"}`}
      >
        {regionOptions.map((region) => {
          return (
            <option
              className="region-option"
              key={regionOptions.indexOf(region)}
              value={region}
              onClick={() => {
                setRegion(region);
                filterDataByRegion(region);
                setSeeOptions(false);
              }}
            >
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </option>
          );
        })}
      </div>
    </div>
  );
}

Select.propTypes = {
  seeOptions: PropTypes.bool,
  setSeeOptions: PropTypes.func,
  regionOptionRef: PropTypes.object,
  regionOptions: PropTypes.array,
  setRegion: PropTypes.func,
  filterDataByRegion: PropTypes.func,
};

export default Select;
