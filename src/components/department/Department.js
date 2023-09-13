import useShow from "../../hooks/use-show";
import Modal from "../Modal";
import DepartmentForm from "./DepartmentForm";
import {useDeleteDepartmentMutation} from "../../store";
import useShowSuccess from "../../hooks/use-show-success";
import useShowErrors from "../../hooks/use-show-errors";
import RenderButton from "../custom/buttons/Button";

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
      <RenderButton onClick={handleShow} button="edit"/>
      <RenderButton onClick={handleTrashClick} button="delete"/>
      <Modal
        show={show}
        handleClose={handleClose}
        head="Змінити дані департаменту"
        body={<DepartmentForm incomeDepartment={department} handleClose={handleClose} />}
      />
    </div>
  )
}