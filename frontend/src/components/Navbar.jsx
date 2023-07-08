import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const Navbar = () => {
  const { token, setToken } = useContext(MyContext);
  const navigate = useNavigate();

  const signout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <h1 className='logo'>Snipy</h1>
      </Link>
      {token && (
        <div className='nav-links'>
          <NavLink to='/create'>Create link</NavLink>
          <NavLink to='/'>Links</NavLink>
          <div onClick={signout}>Sign out</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
