import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backendUrl from '../config';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/notes');
    }
  }
  , [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.username) {
          let error = data.username.join(', ');
          setError(error);
          return;
        }
        else if (data.password) {
          let error = data.password.join(', ');
          setError(error);
          return;
        }
        else if (data.email) {
          let error = data.email.join(', ');
          setError(error);
          return;
        }
        else if (data.first_name) {
          let error = data.first_name.join(', ');
          setError(error);
          return;
        }
        else if (data.last_name) {
          let error = data.last_name.join(', ');
          setError(error);
          return;
        }
        else{
          throw new Error('Registration failed');
        }
      }

      navigate('/login', { replace: true });
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-content-center mt-2">
      <div className='col-md-8'>
      <div className="card bg-transparent ctm_card">
      <div className='card-title'>
        <h2 className='text-white text-center'>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-1">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-1">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-1">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-1">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='text-center mt-3'>
          <button type="submit" className="btn btn-primary ctm_btn">Register</button>
          <p className="mt-3 text-white">Already have an account? <Link className='text-white' to="/login">Login</Link></p>
        </div>
      </form>
      </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Register;
