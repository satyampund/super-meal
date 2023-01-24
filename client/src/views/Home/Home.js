import React, { useState } from 'react';
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

        <div class="container text-center">
          <div class="row">
            <div class="col">Column</div>
            <div class="col">
              <img src={SuperMeal} className="supermeal-img"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
