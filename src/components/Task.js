import { Link } from "react-router-dom";
import Modal from "./Modal";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import UserInfo from "./UserInfo";
import { translatedTaskaskStatuses } from "../translations";
import { useUpdateTaskMutation } from "../store";
import useShowErrors from "../hooks/use-show-errors";

export default function Task({ task }) {

  const [doUpdate, data] = useUpdateTaskMutation();
  const showErrors = useShowErrors();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStatusSelect = (event) => {
    const newStatus = event.target.value;
    doUpdate({task, status: newStatus, user: task.user.id})
      .unwrap()
      .catch((error) => {
        showErrors(error.data);
      });
  }

  const renderedHead = (
    <>
      {task.name}
    </>
  );

  const renderedStatus = <select value={task.status} onChange={handleStatusSelect}>
    {Object.entries(translatedTaskaskStatuses).map((key, value) => {
      return <option id={key[0]} value={key[0]}>{key[1]}</option>;
    })}
  </select>;

  const renderedBody = (
    <>
      <div>Виконавець: <UserInfo data={task.user} /></div>
      <div>Категорія: {task.category}</div>
      <div>Квартал: {task.quarter_display_value}</div>
      <div>Створено: <input type="datetime-local" value={task.created} readOnly /></div>
      <div>Оновлено: <input type="datetime-local" value={task.updated} readOnly /></div>
      <div>Статус: {renderedStatus}</div>
    </>
  );

  const renderedFooter = <Button variant="secondary" onClick={handleClose}>Закрити</Button>;
  

  return (
    <div>
      <Link to="#" onClick={handleShow}>{task.name}</Link>
      <Modal
        show={show}
        handleClose={handleClose}
        head={renderedHead}
        body={renderedBody}
        footer={renderedFooter}
      />
    </div>
  );
}