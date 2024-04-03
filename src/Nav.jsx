import { FaMagnifyingGlass } from "react-icons/fa6";
import PropTypes from "prop-types";

function NavContainer({ darkMode, inputValue, handleInputChange }) {
  return (
    <div className="nav-container">
      <FaMagnifyingGlass
        className={
          darkMode ? "mag-glass mag-glass-dark" : " mag-glass mag-glass-light"
        }
      />
      <input
        className="nav-input"
        type="text"
        placeholder="Search for a country..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

NavContainer.propTypes = {
  darkMode: PropTypes.bool,
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func,
};

export default NavContainer;
