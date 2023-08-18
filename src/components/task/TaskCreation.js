import { Button } from "react-bootstrap";
import Task from "./Task";
import useShow from "../../hooks/use-show";

export default function TaskCreation() {

  const {show, handleShow, handleClose} = useShow();

  const renderedHead = <div>Head here</div>

  const renderedBody = (<div>Task body</div>);

  const renderedFooter = <div>Task footer</div>

  const renderedTrigger = <>
    <Button className="btn btn-primary" onClick={handleShow}>
      Створити нову задачу <b>+</b>
    </Button>
    <br />
  </>;

  return (
    <Task
      show={show}
      handleClose={handleClose}
      head={renderedHead}
      body={renderedBody}
      footer={renderedFooter}
      trigger={renderedTrigger}
    />
  );
}