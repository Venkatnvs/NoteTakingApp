import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backendUrl from '../config';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/notes');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('fullname', data.user.first_name+' '+data.user.last_name);
      localStorage.setItem('email', data.user.email);
      navigate('/notes');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-content-center mt-3">
      <div className='col-md-8'>
      <div className="card bg-transparent ctm_card">
      <div className='card-title'>
        <h2 className='text-white text-center'>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <div className='card-body'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            required
            />
        </div>
        <div className='text-center mt-3'>
          <button type="submit" className="btn btn-primary ctm_btn">Login</button>
          <p className="mt-3 text-white">Don't have an account? <Link className='text-white' to="/register">Register</Link></p>
        </div>
      </form>
      </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Login;
