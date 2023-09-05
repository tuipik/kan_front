import {Link} from "react-router-dom";
import useShow from "../../hooks/use-show";
import Modal from "../Modal";
import DepartmentForm from "./DepartmentForm";
import {useDeleteDepartmentMutation} from "../../store";
import useShowSuccess from "../../hooks/use-show-success";
import useShowErrors from "../../hooks/use-show-errors";
import {AiOutlineEdit} from "react-icons/ai";
import {GoTrash} from "react-icons/go";

export default function Department({ department }) {

  const { show, handleShow, handleClose } = useShow();


  const [doDeleteDepartment] = useDeleteDepartmentMutation();

  const showSuccess = useShowSuccess();

  const showErrors = useShowErrors()

  const handleTrashClick = () => {
    if (!window.confirm(`Видалити департамент ${department.name}?`)) return;
    doDeleteDepartment(department)
      .unwrap()
      .then(result => showSuccess({body: `Департамент ${department.name} успішно видален`}))
      .catch(error => showErrors(error.data))
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1">{department.name}</div>
      <div className="btn" onClick={handleShow}><AiOutlineEdit /></div>
      <div className="btn" onClick={handleTrashClick}><GoTrash /></div>
      <Modal
        show={show}
        handleClose={handleClose}
        head="Змінити дані департаменту"
        body={<DepartmentForm incomeDepartment={department} handleClose={handleClose} />}
      />
    </div>
  )
}