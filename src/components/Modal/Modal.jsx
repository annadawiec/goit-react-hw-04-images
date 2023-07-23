//import { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  //export class Modal extends Component {
  //componentDidMount() {
  //window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  // window.removeEventListener('keydown', this.handleKeyDown);
  //  }

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = event => {
    if (event.code === 'Escape') {
      //if (event.currentTarget === event.target) {
      onClose();
    }
  };

  //render() {
  return createPortal(
    <div className={css.overlay} onClick={handleBackDropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" width={1100} height={800} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: propTypes.func,
  largeImageURL: propTypes.string.isRequired,
};
