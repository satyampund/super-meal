import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import SignupForm from '../Signup/SignupForm';
import LoginForm from '../Login/LoginForm';
import { currentUser } from '../../util/currentUser.js';
import NavBar from '../../components/NavBar/NavBar';
import SuperMeal from './../../assests/super-meal-1.png';

const Home = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  function toggleModalLogin() {
    if (!currentUser) {
      setIsLoginOpen(!isLoginOpen);
    }
  }

  function toggleModalSignup() {
    if (!currentUser) {
      setIsSignupOpen(!isSignupOpen);
    }
  }

  const logOut = () => {
    if (currentUser) {
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
  };

  return (
    <div>
      <div className="home-page">
        <NavBar
          onClickLoginbtn={toggleModalLogin}
          onClickSignupbtn={toggleModalSignup}
          onClickLogout={logOut}
        />
        <SignupForm toggleModalSignup={toggleModalSignup} isSignupOpen={isSignupOpen} />
        <LoginForm toggleModalLogin={toggleModalLogin} isLoginOpen={isLoginOpen} />

        {/* <div class="container text-center">
          <div class="row">
            <div class="col-md-6 parent-container">
              <div className="child-container">
                <h1 className="heading">Super Meal to make you feel good </h1>
                <button className="btn btn-danger">Book Table</button>
                <button className="btn btn-danger">Explore Food</button>
              </div>
            </div>
            <div class="col-md-6">hh</div>
          </div>
        </div> */}

        <div>
          <div class="col-md-6 parent-container">
            <div className="child-container">
              <h1 className="heading">Super Meal to make you feel good </h1>
              <Link to="/dashboard">
                <button className="css-button-arrow--red mx-3 mt-2">Explore Food</button>
              </Link>
              <Link to="/tables">
                <button className="css-button-sliding-to-left--red mx-3 mt-2">Book Table</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
