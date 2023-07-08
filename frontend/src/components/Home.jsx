import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Links from './Links';
import Link from './Link';
import { MyContext } from '../MyContext';

const Home = () => {
  const { token, links, setLinks, setCurrUrl, currUrl } = useContext(MyContext);

  useEffect(() => {
     getUrls();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Get all urls
  async function getUrls() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/urls`,
      options
    );

    const data = await res.json();
    setLinks(data);
    setCurrUrl(data[0]);
  }

  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='home'>
      <h2 className='page-title'>Links</h2>
      <Links links={links} />
      <Link links={links} currUrl={currUrl} />
    </div>
  );
};

export default Home;
