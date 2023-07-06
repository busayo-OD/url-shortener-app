import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const Edit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { token, setCurrUrl, currUrl } = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    title: currUrl ? currUrl.title : '',
    backHalf: currUrl ? currUrl.backHalf : '',
    tags: [],
  });

  useEffect(() => {
    if (!currUrl) {
      getUrl();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

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

  //  Edit urls
  async function editUrl() {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formFields),
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/urls/edit/${id}`,
      options
    );

    const data = await res.json();
    setCurrUrl(data);
    navigate('/');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    editUrl();
  };

  return (
    <div>
      <div>Edit Link</div>
      <form className='form' onSubmit={onSubmit}>
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
        <button>Save</button>
      </form>
    </div>
  );
};

export default Edit;
