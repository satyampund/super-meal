import React from 'react';
import './NavBar.css';
import { currentUser } from '../../util/currentUser';

const NavBar = (props) => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg">
        <span className="ms-3 brand-name mt-3">Super Meal</span>
        {currentUser && <button className="nav-btns ms-3 mt-3">{currentUser?.name}</button>}
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-lg-auto">
            <li className="nav-item">
              {!currentUser && (
                <button className="nav-btns mx-3 my-1 mt-3" onClick={props.onClickLoginbtn}>
                  Login
                </button>
              )}
            </li>
            <li className="nav-item">
              {!currentUser && (
                <button className="nav-btns mx-3 my-1 mt-3" onClick={props.onClickSignupbtn}>
                  Sign up
                </button>
              )}
            </li>
            <li className="nav-item">
              {currentUser && (
                <button className="nav-btns mx-3 my-1 mt-3" onClick={props.onClickLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
