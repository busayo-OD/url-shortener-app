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
        links.map((link) => (
          <div key={link._id} onClick={() => onClick(link._id)}>
            <div>{link.date}</div>
            <div>{link.backHalf}</div>
            <div>{link.longUrl}</div>
          </div>
        ))
      ) : (
        <div>No link</div>
      )}
    </div>
  );
};

export default Links;
