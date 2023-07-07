import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const Login = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const { token, setToken, setAlert } = useContext(MyContext);

  const onChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  async function onSubmit(e) {
    if (formFields.email !== '' && formFields.password !== '') {
      e.preventDefault();

      // Reset
      setToken(null);
      setAlert('');

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formFields),
      };

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        options
      );

      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        sessionStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setAlert(data.error);
        setTimeout(() => {
          setAlert('');
        }, 3000);
        sessionStorage.removeItem('token');
      }
    }
  }

  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <div className='center'>
      <h2>Log in</h2>
      <form onSubmit={onSubmit} className='form'>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formFields.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={formFields.password}
            onChange={onChange}
          />
        </div>
        <button>Log in</button>

        <div>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;