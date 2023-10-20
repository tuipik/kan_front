import Modal from "../Modal";

export default function Task({ show, handleClose, head, body, footer, trigger }) {

  return (
    <>
      {trigger}
      <Modal
        show={show}
        handleClose={handleClose}
        head={head}
        body={body}
        footer={footer}
      />
    </>
  );
}