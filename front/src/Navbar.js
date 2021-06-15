import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "./action/authaction";
import React, { useState, useEffect } from "react";
import { Button } from "././pages/Button";
import "./App.css";

import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  //unshow the register button when we refrech
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            INTO THE WIL <i class="fas fa-caravan"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          {auth.isAuth ? (
            <div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-Item">
                  <Link
                    to="/Profile"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-Item">
                  <Link
                    to="/Groupe"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Groupe
                  </Link>
                </li>

                <li className="nav-Item">
                  <Link
                    className="nav-links"
                    onClick={closeMobileMenu}
                    onClick={() => dispatch(logoutUser())}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-Item">
                  <Link
                    to="/login"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-Item">
                  <Link
                    to="/register"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                  {button && (
                    <Button
                      className="btns"
                      buttonStyle="btn--outline"
                      buttonSize="btn--large"
                    >
                      <Link
                        to="/register"
                        className="get-started"
                        style={{ textDecoration: "none" }}
                      >
                        Register
                      </Link>
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
