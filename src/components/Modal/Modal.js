import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ value, onClose }) => {
  const { id, big } = value;
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });
    

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <div className={s.overlay} onClick={handleClick}>
        <div className={s.modal}>
          <img className={s.img} src={big} alt={id} />
        </div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  value: PropTypes.shape({
    big: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Modal;
