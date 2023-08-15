import { useState } from 'react';
import BtsrpModal from 'react-bootstrap/Modal';

function Modal({ head, body, show, handleClose, footer }) {

  return (
    <>
      <BtsrpModal show={show} onHide={handleClose}>
        <BtsrpModal.Header closeButton>
          <BtsrpModal.Title>{head}</BtsrpModal.Title>
        </BtsrpModal.Header>
        <BtsrpModal.Body>{body}</BtsrpModal.Body>
        <BtsrpModal.Footer>
          {footer}
        </BtsrpModal.Footer>
      </BtsrpModal>
    </>
  );
}

export default Modal;