import React from 'react';
import './Home.css';
import SignupForm from '../Signup/SignupForm';
import LoginForm from '../Login/LoginForm';
import { currentUser } from '../../util/currentUser.js';

const Home = () => {
  const logOut = () => {
    if (currentUser) {
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
  };
  return (
    <div>
      <h1>Home</h1>
      <h3>{currentUser?.name}</h3>
      <button type="button" className="btn btn-danger" onClick={logOut}>
        Logout
      </button>
      <SignupForm />
      <LoginForm />
    </div>
  );
};

export default Home;
