import { IoMoonOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import PropTypes from "prop-types";

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <h1
        onClick={() => {
          location.reload();
        }}
        className="heading"
      >
        Where in the world?
      </h1>
      <button
        onClick={() => {
          toggleDarkMode(!darkMode);
        }}
        className="btn-dark-mode"
      >
        {darkMode ? (
          <IoMoonSharp className="moon-icon moon-icon-dark" />
        ) : (
          <IoMoonOutline className="moon-icon" />
        )}
        Dark Mode
      </button>
    </header>
  );
}

Header.propTypes = {
  toggleDarkMode: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default Header;
