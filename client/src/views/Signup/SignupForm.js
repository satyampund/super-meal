import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Modal from 'react-modal';

import './SignupForm.css';

Modal.setAppElement('#root');

const SignupForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  async function signupUser() {
    const response = await axios.post('/signup', {
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: role,
    });

    console.log(response.data);

    if (response.data.success) {
      await swal({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        button: 'OK',
      });
      window.location.href = '/';
    } else {
      swal({
        title: 'Error',
        text: response.data.message,
        icon: 'error',
        button: 'OK',
      });
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
    }
  }

  return (
    <>
      <Modal
        isOpen={props.isSignupOpen}
        onRequestClose={props.toggleModalSignup}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}>
        <form className="form-elements signup-form-container">
          <div className="element-holder">
            <span onClick={props.toggleModalSignup} className="signupModal-closeBtn">
              &times;
            </span>
            <label className="signup__form-label" htmlFor="name">
              Name
            </label>
            <input
              required
              placeholder="Enter Your Name"
              type="text"
              className="signup__form-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="element-holder">
            <label className="signup__form-label" htmlFor="email">
              Email
            </label>
            <input
              required
              placeholder="Enter Your Email"
              type="email"
              className="signup__form-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="element-holder">
            <label className="signup__form-label" htmlFor="phone">
              Phone
            </label>
            <input
              required
              placeholder="Enter Your Phone"
              type="text"
              className="signup__form-input"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="element-holder">
            <label className="signup__form-label" htmlFor="password">
              Password
            </label>
            <input
              required
              placeholder="Enter Your Password"
              type="password"
              className="signup__form-input"
              id="passwrod"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="css-button-rounded--sky" onClick={signupUser}>
            Sign Up
          </button>
        </form>
      </Modal>
    </>
  );
};

export default SignupForm;
