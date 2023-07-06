import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const Register = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    first_name: '',
    last_name: '',
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
      `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
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

  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={onSubmit} className='form'>
        <div>
          <label>Firstname</label>
          <input
            type='text'
            name='first_name'
            value={formFields.first_name}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Lastname</label>
          <input
            type='text'
            name='last_name'
            value={formFields.last_name}
            onChange={onChange}
          />
        </div>
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
        <button>Sign up</button>

        <div>
          Already have an account? <Link to='/login'>Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
