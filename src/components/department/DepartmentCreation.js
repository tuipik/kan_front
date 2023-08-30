import { Button } from "react-bootstrap";
import Modal from "../Modal";
import useShow from "../../hooks/use-show";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentCreation() {

  const { show, handleShow, handleClose } = useShow();

  const body = <div>body</div>

  return (
    <>
      <Button className="btn btn-primary" onClick={handleShow}>Створити новий департамент <b>+</b></Button>
      <Modal
        show={show}
        handleClose={handleClose}
        head="Новий департамент"
        body={<DepartmentForm />}
      />
    </>
  )
}