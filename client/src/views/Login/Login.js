import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import SignupImg from './../../assests/signup.png';

const Login = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  async function signupUser() {
    const response = await axios.post('/signup', {
      email: email,
      password: password,
    });

    console.log(response.data);

    if (response.data.success) {
      alert(response.data.message);
      window.location.href = '/login';
    } else {
      alert(response.data.message);

      setEmail('');

      setPassword('');
    }
  }

  return (
    <div>
      <h1 className="text-center">Login</h1>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 mt-md-5">
            <img src={SignupImg} className="signup-img" alt="signup"></img>
          </div>

          <div className="col-md-6 mt-md-5">
            <form className="form-elements login-form-container">
              <div className="element-holder">
                <label className="login__form-label" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  placeholder="Enter Your Email"
                  type="email"
                  className="login__form-input"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="element-holder">
                <label className="login__form-label" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  placeholder="Enter Your Password"
                  type="password"
                  className="login__form-input"
                  id="passwrod"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="button" className="css-button-rounded--sky" onClick={signupUser}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
