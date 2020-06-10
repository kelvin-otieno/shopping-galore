import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import "./header.scss";

const Header = (props) => {
  return (
    <div className="navbar ">
      <nav className="white z-depth-0">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo black-text">
            <Logo />
          </Link>
          <ul id="nav-mobile" className="right">
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
            {props.currentUser ? (
              <li>
                <Link to="/signin" onClick={() => auth.signOut()} className="link">
                  SIGN OUT
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/signin" className="link">
                  SIGN IN
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
