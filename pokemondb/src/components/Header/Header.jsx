import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../images/home-icon-white2.svg";
import myPokemonIcon from "../../images/mypokeball-icon.svg";
import logoutIcon from "../../images/logout-icon.svg";
import "./Header.css";

const Header = ({ onLoginClick, onSignOut, isLoggedIn, currentUser }) => {
  const location = useLocation();
  const isProfileRoute = location.pathname === "/profile";
  return (
   <header className={`header ${isProfileRoute ? "header--profile" : "header--home"}`}>
      <div className="logo__container">
        <span className="header__logo">POKÉMON</span>
        <span className="header__logo-arial">DB</span>
      </div>
      <nav className="header__nav">
       
          <Link to="/" className="nav__home">
            Home
          </Link>
        
        {isProfileRoute && (
          <Link to="/" className="nav__icon-wrapper">
            <img src={homeIcon} alt="Home" className="profile__icon" />
          </Link>
        )}

        {isLoggedIn && currentUser ? (
          <>
            <Link to="/profile" className="nav__favorites">
              <span className="header__my-favorites">MY</span>
              <span className="header__favorites">POKÉMON</span>
            </Link>
            <Link to="/profile" className="nav__icon-wrapper">
              <img
                src={myPokemonIcon}
                alt="My Pokémon"
                className="profile__icon"
              />
            </Link>

            <button className="nav__logout" onClick={onSignOut}>
              Logout
            </button>
            <button className="nav__icon-wrapper" onClick={onSignOut}>
              <img src={logoutIcon} alt="Logout" className="profile__icon" />
            </button>
          </>
        ) : (
          <>
            <button className="nav__login" onClick={onLoginClick}>
              Login
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
