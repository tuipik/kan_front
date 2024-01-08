import {Link} from "react-router-dom";
import useShow from "../../hooks/use-show";
import Modal from "../Modal";
import DepartmentForm from "./DepartmentForm";
import {useDeleteDepartmentMutation} from "../../store";
import useShowSuccess from "../../hooks/use-show-success";
import useShowErrors from "../../hooks/use-show-errors";
import Icon from "../custom/icon/Icon";
import HandleTrashClick from "../../utils/delete_wraper";

export default function Department({department}) {

  const {show, handleShow, handleClose} = useShow();


  const [doDeleteDepartment] = useDeleteDepartmentMutation();
  const showSuccess = useShowSuccess();
  const showErrors = useShowErrors()

  const handleTrashClick = () => {
    return HandleTrashClick(
      doDeleteDepartment(department),
     `Видалити відділ ${department.name}?`,
     `Відділ ${department.name} успішно видален`,
      showSuccess,
      showErrors
    )
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1">{department.name}</div>
      <Icon onClick={handleShow} icon="edit" behaveLikeButton={true}/>
      <Icon onClick={handleTrashClick} icon="delete" behaveLikeButton={true}/>
      <Modal
        show={show}
        handleClose={handleClose}
        head="Змінити дані відділу"
        body={<DepartmentForm incomeDepartment={department} handleClose={handleClose}/>}
      />
    </div>
  )
}