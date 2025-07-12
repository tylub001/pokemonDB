import { Link } from "react-router-dom";
import "./Footer.css"; // your CSS file
import githubIcon from "../../images/github.svg";
import facebookIcon from "../../images/facebook.svg";

const Footer = () => {
  return (
    <footer className="author-footer">
      <div className="footer__wrapper">
        <div className="author-footer__content">
          <div
            className="footer__image"
            role="img"
            aria-label="Author portrait"
          ></div>
          <div className="footer__text">
            <h4>About the Author</h4>
            <p>
              Brittany is a passionate developer with a love for backend
              architecture, expressive UI, and bringing playful creativity to
              every line of code.
            </p>
          </div>
        </div>
        <div className="footer__container_type_profile">
        
          <nav className="footer__nav">
              <div className="nav__text">
            <Link to="/" className="nav__link">
              Home
            </Link>
            <button className="nav__link">Triple Ten</button>
            </div>
            <div className="nav__icon">
            <a
              href="https://github.com/tylub001"
              className="nav__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="GitHub" className="nav__icon-facebook" />
            </a>

            <a
              href="https://www.facebook.com/brittany.tylutke"
              className="nav__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="Facebook" className="nav__icon-github" />
            </a>
            </div>
          </nav>
        </div>
        <p className="footer__name">
          &copy; 2025 Supersite, Powered by PokeApi{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
