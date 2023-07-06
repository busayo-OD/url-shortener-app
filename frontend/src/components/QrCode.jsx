import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const QrCode = () => {
  let { id } = useParams();
  const { token, currUrl, setCurrUrl, qrCode, setQrCode } =
    useContext(MyContext);

  const [bodyData, setBodyData] = useState({
    shortUrl: currUrl && currUrl.shortUrl,
  });

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
    <div>
      <div>QR Code</div>
      {qrCode && <img src={qrCode} alt='QR' />}
    </div>
  );
};

export default QrCode;
