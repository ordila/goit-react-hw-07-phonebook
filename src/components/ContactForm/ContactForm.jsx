import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setData, setDataInitialState } from 'components/redux/dataReducer';

const ContactForm = ({ onAdd, onCheckUnique }) => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  const onChangeInput = event => {
    const { name, value } = event.target;
    dispatch(setData({ [name]: value }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const { name, phone } = data;

    const isValidateForm = validateForm();
    if (!isValidateForm) return;
    onAdd({ name, phone });
    dispatch(setDataInitialState());
  };
  const validateForm = () => {
    const { name, phone } = data;
    if (!name || !phone) {
      alert('Заповніть усі поля');
      return false;
    }

    if (onCheckUnique(name)) {
      return true;
    } else {
      alert('Контакт вже існує');
      return false;
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={data.name}
        name="name"
        onChange={onChangeInput}
      />
      <input
        type="tel"
        value={data.phone}
        name="phone"
        onChange={onChangeInput}
      />
      <button type="submit">Додати</button>
    </form>
  );
};

export default ContactForm;
