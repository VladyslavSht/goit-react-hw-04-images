import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({ submit }) => {
  const [text, setText] = useState('');

  const handleInput = e => {
    setText(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() === '') {
      return toast.warning('Enter search request');
    }
    submit(text);
    setText("");
  };

    return (
      <header className={s.header}>
        <form className={s.form} onSubmit={handleSubmit}>
          <button type="submit" className={s.button}>
            <span className="button-label">Search</span>
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={text}
            onChange={handleInput}
          />
        </form>
      </header>
    );
  }

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default Searchbar;
