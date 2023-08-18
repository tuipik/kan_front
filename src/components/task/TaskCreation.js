import { Button } from "react-bootstrap";
import Task from "./Task";
import useShow from "../../hooks/use-show";
import TaskForm from "./TaskForm";

export default function TaskCreation() {

  const { show, handleShow, handleClose } = useShow();

  const renderedHead = <div>Нова задача</div>

  const renderedTrigger = <>
    <br />
    <Button className="btn btn-primary" onClick={handleShow}>
      Створити нову задачу <b>+</b>
    </Button>
    <br />
    <br />
  </>;

  return (
    <Task
      show={show}
      handleClose={handleClose}
      head={renderedHead}
      body={<TaskForm handleClose={handleClose} />}
      trigger={renderedTrigger}
    />
  );
}