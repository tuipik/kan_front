import { Link } from "react-router-dom";
import Modal from "./Modal";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useUpdateTaskMutation } from "../store";
import useShowErrors from "../hooks/use-show-errors";
import CommentList from "./ComentList";
import TaskMainInfo from "./TaskMainInfo";
import TaskTimeStatuses from "./TaskTimeStatuses";
import TaskStatus from "./TaskStatus";

export default function Task({ task }) {

  const [doUpdate, data] = useUpdateTaskMutation();
  const showErrors = useShowErrors();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <div>
      <Link to="#" onClick={handleShow}>{task.name}</Link>
      <Modal
        show={show}
        handleClose={handleClose}
        head={task.name}
        body={renderedBody}
        footer={renderedFooter}
      />
    </div>
  );
}