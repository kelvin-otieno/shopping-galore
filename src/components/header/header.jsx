import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from "../../images/crown.svg"
import "./header.scss";

const Header = () => {
  return (
    <div className="navbar">
      <nav className="white">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo black-text">
            <Logo/>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/shop" className="link">
                SHOP
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link">
                CONTACT
              </Link>
            </li>
            <li>
              <Link to="/signin" className="link">
                SIGN IN
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
