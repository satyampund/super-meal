import React from 'react';
import './NavBar.css';
import { currentUser } from '../../util/currentUser';

const NavBar = (props) => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-custom">
        <span className="ms-3 brand-name">Super Meal</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-lg-auto mx-4">
            <li className="nav-item">
              {!currentUser && (
                <button className="nav-btns" onClick={props.onClickLoginbtn}>
                  Login
                </button>
              )}
            </li>
            <li className="nav-item">
              {!currentUser && (
                <button className="nav-btns" onClick={props.onClickSignupbtn}>
                  Sign up
                </button>
              )}
            </li>
            <li className="nav-item">
              {currentUser && <button className="nav-btns">Logout</button>}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
