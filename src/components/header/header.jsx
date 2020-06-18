import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AppLogo } from "../../images/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import "./header.scss";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon";
import Cart from "../cart/cart";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="navbar-fixed">
        <nav className="white z-depth-0">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo black-text">
              <AppLogo />
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
              {currentUser ? (
                <li>
                  <Link
                    to="/signin"
                    onClick={() => auth.signOut()}
                    className="link"
                  >
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

              {/* <li className="dropdown-trigger" data-target="dropdown1" id = "dropdown">
              <CartIcon />
            </li> */}
              <li>
                <CartIcon />
              </li>
            </ul>
          </div>
        </nav>
        {/* <ul id="dropdown1" className="dropdown-content z-depth-0">
        <li>
          <Cart />
        </li>
      </ul> */}
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
