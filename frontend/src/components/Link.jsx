import React from 'react';
import { Link as PageLink } from 'react-router-dom';

const Link = ({ currUrl }) => {
  return (
    <div>
      {currUrl && (
        <>
          <div>{currUrl.title}</div>
          <div>{currUrl.shortUrl}</div>
          <div>{currUrl.date}</div>
          <PageLink to={`/${currUrl._id}/edit`}>Edit</PageLink>
        </>
      )}

      <div></div>

      {currUrl && (
        <>
          {currUrl.qrCode && <img src={currUrl.qrCode} alt='QR Code' />}
          {!currUrl.qrCode && (
            <PageLink to={`/${currUrl._id}/create-qrcode`}>
              Generate QR Code
            </PageLink>
          )}
        </>
      )}
      {!currUrl && <div>No link</div>}
    </div>
  );
};

export default Link;
