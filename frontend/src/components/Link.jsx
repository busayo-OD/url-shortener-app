import React from 'react';
import { Link as PageLink } from 'react-router-dom';

const Link = ({ currUrl }) => {
  return (
    <div className='link'>
      {currUrl && (
        <div className='card'>
          <a href={currUrl.shortUrl} target='_blank' rel='noreferrer'>
            {currUrl.shortUrl}
          </a>
          <div>{currUrl.date.slice(0, 28)}</div>
          <PageLink to={`/${currUrl._id}/edit`} className='edit-btn'>Edit</PageLink>
        </div>
      )}

      {currUrl && (
        <div className='card'>
          <a href={currUrl.shortUrl} className='colored' target='_blank' rel='noreferrer'>
            {currUrl.shortUrl}
          </a>
          <div>{currUrl.title}</div>
          {currUrl.qrCode && <img src={currUrl.qrCode} alt='QR Code' />}
          {!currUrl.qrCode && (
            <PageLink to={`/${currUrl._id}/create-qrcode`}>
              Generate QR Code
            </PageLink>
          )}
        </div>
      )}
      {!currUrl && <div>No link</div>}
    </div>
  );
};

export default Link;