import { useState } from "react";

export default function useShow() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return { show, handleShow, handleClose };
}