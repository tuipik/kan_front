import {Link} from "react-router-dom";
import useShow from "../../hooks/use-show";
import Modal from "../Modal";
import DepartmentForm from "./DepartmentForm";

export default function Department({ data }) {

  const { show, handleShow, handleClose } = useShow();

  return (
    <>
      <Link to="#" onClick={handleShow}>{data.name}</Link>
      <Modal
        show={show}
        handleClose={handleClose}
        head="Змінити дані департаменту"
        body={<DepartmentForm incomeDepartment={data} handleClose={handleClose} />}
      />
    </>
  )
}