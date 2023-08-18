import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import CommentList from "../ComentList";
import TaskMainInfo from "./TaskMainInfo";
import TaskTimeStatuses from "./TaskTimeStatuses";
import TaskStatus from "./TaskStatus";
import Task from "./Task";
import useShow from "../../hooks/use-show";

export default function TaskDetails({ task }) {

  const {show, handleShow, handleClose} = useShow();
  
  const renderedBody = (
    <div className="container">
      <div className="row">
        <TaskMainInfo task={task} />
        <TaskTimeStatuses task={task} />
      </div>
      <br />
      <TaskStatus task={task} />
      <CommentList task={task} />
    </div>
  );

  const renderedFooter = <Button variant="success" onClick={handleClose}>Закрити</Button>;

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