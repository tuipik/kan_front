import useShow from "../../hooks/use-show";
import Modal from "../Modal";
import DepartmentForm from "./DepartmentForm";
import {useDeleteDepartmentMutation} from "../../store";
import useShowSuccess from "../../hooks/use-show-success";
import useShowErrors from "../../hooks/use-show-errors";
import Icon from "../custom/icon/Icon";

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
      <Icon onClick={handleShow} icon="edit" behaveLikeButton={true}/>
      <Icon onClick={handleTrashClick} icon="delete" behaveLikeButton={true}/>
      <Modal
        show={show}
        handleClose={handleClose}
        head="Змінити дані департаменту"
        body={<DepartmentForm incomeDepartment={department} handleClose={handleClose} />}
      />
    </div>
  )
}