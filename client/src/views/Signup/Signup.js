import React from 'react';
import './Signup.css';
import SignupImg from './../../assests/signup.png';

const Signup = () => {
  return (
    <div>
      <h1 className="text-center">Sign up</h1>
      <div class="container text-center">
        <div class="row">
          <div class="col-md-6 mt-md-5">
            <img src={SignupImg} className="signup-img" alt="signup"></img>
          </div>

          <div class="col-md-6 mt-md-5">
            <form className="form-elements form-container">
              <div className="element-holder">
                <label class="contact__form-label" for="name">
                  Name
                </label>
                <input
                  required
                  placeholder="Enter Your Name"
                  type="text"
                  class="contact__form-input"
                  name="Name"
                  id="name"
                />
              </div>
              <div className="element-holder">
                <label class="contact__form-label" for="email">
                  Email
                </label>
                <input
                  required
                  placeholder="Enter Your Email"
                  type="email"
                  class="contact__form-input"
                  name="Email"
                  id="email"
                />
              </div>
              <div className="element-holder">
                <label class="contact__form-label" for="phone">
                  Phone
                </label>
                <input
                  required
                  placeholder="Enter Your Phone"
                  type="text"
                  class="contact__form-input"
                  name="Phone"
                  id="phone"
                />
              </div>
              <div className="element-holder">
                <label class="contact__form-label" for="password">
                  Password
                </label>
                <input
                  required
                  placeholder="Enter Your Password"
                  type="password"
                  class="contact__form-input"
                  name="Password"
                  id="passwrod"
                />
              </div>
              <button type="submit" class="css-button-rounded--sky">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
