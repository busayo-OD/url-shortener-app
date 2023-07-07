import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../MyContext';

const QrCode = () => {
  let { id } = useParams();
  const { token, currUrl, setCurrUrl, qrCode, setQrCode } =
    useContext(MyContext);

  useEffect(() => {
    if (!currUrl) {
      getUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if(!currUrl) {}
    generateQR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generateQR() {
    const bodyData = {
      shortUrl: currUrl && currUrl.shortUrl,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/qr/create/${id}`,
      options
    );

    const data = await res.json();
    setQrCode(data.QrCode);
  }

  // Get url by id
  async function getUrl() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/urls/${id}`,
      options
    );

    const data = await res.json();
    setCurrUrl(data);
  }

  return (
    <div className='qr-code center'>
      <h2>QR Code</h2>
      {qrCode && <img src={qrCode} alt='QR' />}
    </div>
  );
};

export default QrCode;