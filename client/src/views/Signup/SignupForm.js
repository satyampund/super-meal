import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const SignupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  function toggleModal() {
    setIsOpen(!isOpen);
  }

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
      alert(response.data.message);
      window.location.href = '/login';
    } else {
      alert(response.data.message);
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
    }
  }

  return (
    <>
      <button onClick={toggleModal}>Sign up</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}>
        <form className="form-elements signup-form-container">
          <div className="element-holder">
            <label className="contact__form-label" htmlFor="name">
              Name
            </label>
            <input
              required
              placeholder="Enter Your Name"
              type="text"
              className="contact__form-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="element-holder">
            <label className="contact__form-label" htmlFor="email">
              Email
            </label>
            <input
              required
              placeholder="Enter Your Email"
              type="email"
              className="contact__form-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="element-holder">
            <label className="contact__form-label" htmlFor="phone">
              Phone
            </label>
            <input
              required
              placeholder="Enter Your Phone"
              type="text"
              className="contact__form-input"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="element-holder">
            <label className="contact__form-label" htmlFor="password">
              Password
            </label>
            <input
              required
              placeholder="Enter Your Password"
              type="password"
              className="contact__form-input"
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
