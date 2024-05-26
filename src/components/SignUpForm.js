import React, { useState } from 'react';
import '../styles/App.css';


const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'Select',
    phoneNumber: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = () => {
    const { name, email, gender, phoneNumber, password } = formData;

    setError('');
    setWelcomeMessage('');

    if (!name || !email || !phoneNumber || !password) {
      setError('All fields are mandatory.');
      return;
    }

    if (!/^[a-z0-9 ]+$/i.test(name)) {
      setError('Name is not alphanumeric.');
      return;
    }

    if (!/@/.test(email)) {
      setError('Email must contain @.');
      return;
    }

    if (!['male', 'female', 'other'].includes(gender)) {
      setError('Please identify as male, female or others.');
      return;
    }

    if (!/^\d+$/.test(phoneNumber)) {
      setError('Phone Number must contain only numbers.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 letters.');
      return;
    }

    const username = email.split('@')[0];
    setWelcomeMessage(`Hello ${username}`);
  };

  return (
    <div className="form-container">
      <form id="signupForm" onSubmit={(e) => e.preventDefault()}>
        <div className="error" id="error">{error}</div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" data-testid="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="text" id="email" data-testid="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender" data-testid="gender" value={formData.gender} onChange={handleChange}>
            <option value="select">Select</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" data-testid="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" data-testid="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <button type="button" id="submit" data-testid="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
      <div id="welcomeMessage">{welcomeMessage}</div>
    </div>
  );
};

export default SignupForm;
