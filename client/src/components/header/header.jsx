import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AppLogo } from "../../images/crown.svg";
import "./header.scss";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon";
import Cart from "../cart/cart";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../redux/user/user.action";

const Header = ({ currentUser, signOutStart }) => {
  return (
    <div className="header">
      <div className="navbar-fixed ">
        <nav className="white z-depth-0">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo black-text">
              <AppLogo />
            </Link>
            <Link
              to=""
              data-target="mobile-demo"
              className="sidenav-trigger black-text"
            >
              <i className="material-icons">menu</i>
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
              {currentUser ? (
                <li>
                  <Link to="/signin" onClick={signOutStart} className="link">
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

              <li>
                <CartIcon />
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="hide-on-large-only right cart-mobile">
        <CartIcon />
      </div>
      <ul id="mobile-demo" className="sidenav sidenav-close">
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
            <Link to="/signin" onClick={signOutStart} className="link">
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
      <Cart />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
