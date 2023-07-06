import './style.scss';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyContext } from './MyContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import CreateLink from './components/CreateLink';
import NotFound from './components/NotFound';
import Edit from './components/Edit';
import QrCode from './components/QrCode';

function App() {
  const lsToken = sessionStorage.getItem('token');
  const [token, setToken] = useState(lsToken ? lsToken : null);
  const [alert, setAlert] = useState('');
  const [links, setLinks] = useState([]);
  const [currUrl, setCurrUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  return (
    <MyContext.Provider
      value={{
        token,
        setToken,
        alert,
        setAlert,
        links,
        setLinks,
        currUrl,
        setCurrUrl,
        qrCode,
        setQrCode,
      }}
    >
      <Navbar />
      {alert && <div>{alert}</div>}
      <div className='page-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreateLink />} />
          <Route path='/:id/edit' element={<Edit />} />
          <Route path='/:id/create-qrcode' element={<QrCode />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </MyContext.Provider>
  );
}

export default App;
