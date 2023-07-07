import React, { useContext } from 'react';
import { MyContext } from '../MyContext';

const Links = ({ links }) => {
  const { setCurrUrl } = useContext(MyContext);

  const onClick = (id) => {
    const result = links.find((link) => link._id === id);
    setCurrUrl(result);
  };

  return (
    <div className='links'>
      {links.length ? (
        links.map((link, index) => (
          <div key={index} className='card' onClick={() => onClick(link._id)}>
            <div className='date'>{link.date.slice(0,15)}</div>
            <a href={link.longUrl} className='long-url' target='_blank' rel='noreferrer'>
              {link.longUrl}
            </a>
            <a href={link.shortUrl} className='short-url' target='_blank' rel='noreferrer'>
              {link.shortUrl}
            </a>
          </div>
        ))
      ) : (
        <div>No link</div>
      )}
    </div>
  );
};

export default Links;