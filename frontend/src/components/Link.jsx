import React, { useState } from 'react';
import { Link as PageLink } from 'react-router-dom';

const Link = ({ currUrl }) => {
  const [buttonText, setButtonText] = useState('Copy');

  const onClick = () => {
    navigator.clipboard.writeText(currUrl.shortUrl);
    setButtonText('Copied!');
  };

  return (
    <div className='link'>
      {currUrl && (
        <div className='card'>
          {currUrl.title ? (
            <div>{currUrl.title}</div>
          ) : (
            <a href={currUrl.shortUrl} target='_blank' rel='noreferrer'>
              {currUrl.shortUrl}
            </a>
          )}
          <div>{currUrl.date.slice(0, 28)}</div>
          <PageLink to={`/${currUrl._id}/edit`} className='edit-btn'>
            Edit
          </PageLink>
        </div>
      )}

      {currUrl && (
        <div className='card'>
          <div className='link-copy'>
            <a
              href={currUrl.shortUrl}
              className='colored'
              target='_blank'
              rel='noreferrer'
            >
              {currUrl.shortUrl}
            </a>

            <button onClick={onClick} className='copy'>
              {buttonText}
            </button>
          </div>
          <div className='redirect'>
            <span>Redirect to - </span>{' '}
            <a href={currUrl.longUrl} target='_blank' rel='noreferrer'>
              {currUrl.longUrl}
            </a>
          </div>
          {currUrl.qrCode && (
            <div className='link-qr'>
              <h2>QR Code</h2>
              <img src={currUrl.qrCode} alt='QR Code' />
              <a href={currUrl.qrCode} download alt='QR'>
                Download
              </a>
            </div>
          )}
          {!currUrl.qrCode && (
            <PageLink to={`/${currUrl._id}/create-qrcode`} className='generate'>
              Generate QR Code
            </PageLink>
          )}

          {currUrl && (
            <div className='stats'>
              <h2>Analytics</h2>

              <div className='readings'>
                <span className='label'>Clicks : </span>
                <span className='value'>{currUrl.clicks}</span>
              </div>
            </div>
          )}
        </div>
      )}
      {!currUrl && <div>No link</div>}
    </div>
  );
};

export default Link;