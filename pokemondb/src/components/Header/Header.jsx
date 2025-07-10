import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ onLoginClick, onSignupClick }) => {
  return (
    <header className="header">
     <div className="logo__conttainer">
      <span className="header__logo">POKÉMON</span>
      <span className="header__logo-arial">DB</span>
   </div>
      <nav className="header__nav">
        <Link to="/" className="nav__link">
          Home
        </Link>
        <button className="nav__link" onClick={onLoginClick}>
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
