import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Modal from 'react-modal';

import './LoginForm.css';

Modal.setAppElement('#root');

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    const response = await axios.post('/login', {
      email: email,
      password: password,
    });

    console.log(response.data);

    if (response.data.success) {
      await swal({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        button: 'OK',
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));
      window.location.href = '/';
    } else {
      swal({
        title: 'Error',
        text: response.data.message,
        icon: 'error',
        button: 'OK',
      });
      localStorage.removeItem('currentUser');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <>
      <Modal
        isOpen={props.isLoginOpen}
        onRequestClose={props.toggleModalLogin}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={200}>
        <form className="form-elements login-form-container">
          <div className="element-holder">
            <span onClick={props.toggleModalLogin} className="loginModal-closeBtn">
              &times;
            </span>
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
          <button type="button" className="css-button-rounded--sky" onClick={loginUser}>
            Login
          </button>
        </form>
      </Modal>
    </>
  );
};

export default LoginForm;
