import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const CreateLink = () => {
  const navigate = useNavigate();

  const { token, links, setLinks } = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    longUrl: '',
    title: '',
    backHalf: '',
  });

  const onChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  async function createUrl() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formFields),
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/urls/shorten`,
      options
    );

    const data = await res.json();
    setLinks([data, ...links]);
    navigate('/');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    createUrl();
  };

  return (
    <form onSubmit={onSubmit} className='form'>
      <div>
        <label>Destination</label>
        <input
          type='text'
          name='longUrl'
          value={formFields.longUrl}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Title</label>
        <input
          type='text'
          name='title'
          value={formFields.title}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Back half</label>
        <input
          type='text'
          name='backHalf'
          value={formFields.backHalf}
          onChange={onChange}
        />
      </div>
      <button>Create</button>
    </form>
  );
};

export default CreateLink;
