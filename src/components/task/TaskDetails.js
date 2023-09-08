import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import CommentList from "../custom/comment/ComentList";
import TaskMainInfo from "./TaskMainInfo";
import TaskTimeStatuses from "./TaskTimeStatuses";
import TaskStatus from "./TaskStatus";
import Task from "./Task";
import useShow from "../../hooks/use-show";
import { useDeleteTaskMutation } from "../../store";
import useShowSuccess from "../../hooks/use-show-success";

export default function TaskDetails({ task }) {

  const {show, handleShow, handleClose} = useShow();
  const [doDeleteTask, taskData] = useDeleteTaskMutation();
  const showSuccess = useShowSuccess();

  const handleDeleteTask = () => {
    if (!window.confirm(`Ви впевнені, що хочете видалити задачу ${task.name}?`)) {
      return;
    }
    doDeleteTask(task)
      .unwrap()
      .then(() => {
        handleClose();
        showSuccess({body: `Задачу ${task.name} успішно видалено`})
      })
      .catch((error) => console.log(error))
    ;
  }
  
  const renderedBody = (
    <div className="container">
      <div className="row">
        <TaskMainInfo task={task} />
        <TaskTimeStatuses task={task} />
      </div>
      <TaskStatus task={task} />
      <Button className="btn btn-warning mb-3 mt-3" onClick={handleDeleteTask}>Видалити задачу</Button>
      <br />
      <br />
      <br />
      <CommentList task={task} />
    </div>
  );

  const renderedFooter = <Button variant="primary" onClick={handleClose}>Закрити</Button>;

  const renderedTrigger = <Link to="#" onClick={handleShow}>{task.name}</Link>;

  return (
    <Task
      show={show}
      handleClose={handleClose}
      head={task.name}
      body={renderedBody}
      footer={renderedFooter}
      trigger={renderedTrigger}
    />
  );
}