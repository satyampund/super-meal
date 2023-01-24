import React, { useState } from 'react';
import './Home.css';
import SignupForm from '../Signup/SignupForm';
import LoginForm from '../Login/LoginForm';
import { currentUser } from '../../util/currentUser.js';
import NavBar from '../../components/NavBar/NavBar';

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
        <NavBar onClickLoginbtn={toggleModalLogin} onClickSignupbtn={toggleModalSignup} />
        <h3>{currentUser?.name}</h3>
        <button type="button" className="btn btn-danger" onClick={logOut}>
          Logout
        </button>
        <SignupForm toggleModalSignup={toggleModalSignup} isSignupOpen={isSignupOpen} />
        <LoginForm toggleModalLogin={toggleModalLogin} isLoginOpen={isLoginOpen} />
      </div>
    </div>
  );
};

export default Home;
