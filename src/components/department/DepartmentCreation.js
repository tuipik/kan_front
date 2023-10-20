import { Button } from "react-bootstrap";
import Modal from "../Modal";
import useShow from "../../hooks/use-show";
import DepartmentForm from "./DepartmentForm";
import DepartmentModel from "./DepartmentModel";

export default function DepartmentCreation() {

  const { show, handleShow, handleClose } = useShow();

  return (
    <>
      <Button className="btn btn-primary" onClick={handleShow}>Створити новий відділ <b>+</b></Button>
      <Modal
        show={show}
        handleClose={handleClose}
        head="Новий відділ"
        body={<DepartmentForm handleClose={handleClose} incomeDepartment={new DepartmentModel()} create={true} />}
      />
    </>
  );
}