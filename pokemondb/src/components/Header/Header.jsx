import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ onLoginClick, onSignOut, isLoggedIn, currentUser }) => {
  console.log("Header received isLoggedIn:", isLoggedIn);
console.log("Header received currentUser:", currentUser);
  return (
    <header className="header header__type_profile">
     <div className="logo__conttainer">
      <span className="header__logo">POKÉMON</span>
      <span className="header__logo-arial">DB</span>
   </div>
      <nav className="header__nav header__nav_type_profile">
        <Link to="/" className="nav__link">
          Home
        </Link>

      {isLoggedIn && currentUser ? (
          <>
            <Link to="/profile" className="nav__link">
            <span className="header__my-favorites">MY</span>
             <span className="header__favorites">POKÉMON</span>
      
            </Link>
            <button className="nav__link" onClick={onSignOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="nav__link" onClick={onLoginClick}>
              Login
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
