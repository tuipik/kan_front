import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import CommentList from "../custom/comment/ComentList";
import TaskMainInfo from "./TaskMainInfo";
import TaskTimeStatuses from "./TaskTimeStatuses";
import Task from "./Task";
import useShow from "../../hooks/use-show";
import { useDeleteTaskMutation } from "../../store";
import useShowSuccess from "../../hooks/use-show-success";
import TaskForm from "./TaskForm";
import {UPDATE_TYPE} from "./TaskForm";
import {useState} from "react";
import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";
import Insignia from "./insignia/Insignia";
import TaskProgressBar from "./TaskProgressBar";
import {CardStyleService} from "../../services/cardStyle";

export default function TaskDetails({ task }) {

  const {show: showModal, handleShow: handleShowModal, handleClose: handleCloseModal} = useShow();
  const [showEditForm, setShowEditForm] = useState(false);
  const [doDeleteTask] = useDeleteTaskMutation();
  const showSuccess = useShowSuccess();
  const { data: {is_admin, department} } = useSelector((state) => {
    return state.auth;
  });

  const handleDeleteTask = () => {
    if (!window.confirm(`Ви впевнені, що хочете видалити задачу ${task.name}?`)) {
      return;
    }
    doDeleteTask(task)
      .unwrap()
      .then(() => {
        handleCloseModal();
        showSuccess({body: `Задачу ${task.name} успішно видалено`})
      })
      .catch((error) => console.log(error))
    ;
  }

  const showEditTask = () => {
    setShowEditForm(true);
  };

  const hideEditTask = () => {
    handleCloseModal();
    setShowEditForm(false);
  };

  const showEditBtn = is_admin || (department === task.department);
  const renderedBody = showEditForm ?
    <TaskForm handleClose={() => setShowEditForm(false)} incomeTask={task} formType={UPDATE_TYPE} />
    : (
      <div className="container">
        <div className="row">
          <TaskMainInfo task={task} />
          <TaskTimeStatuses task={task} />
        </div>
        {is_admin && <Button className="btn btn-warning mb-3 mt-3 me-3" onClick={handleDeleteTask}>Видалити задачу</Button>}
        {showEditBtn &&  <Button className="btn btn-primary mb-3 mt-3" onClick={showEditTask}>Змінити задачу</Button>}
        <br />
        <br />
        <br />
        <CommentList task={task} />
      </div>
  );

  const renderedFooter = <Button variant="primary" onClick={hideEditTask}>Закрити</Button>;

  const cardStylesService = new CardStyleService(task);

  const renderedTrigger =
    <Card>
      <Card.Body style={cardStylesService.styles}>
        <Card.Text>
          <Link to="#" onClick={handleShowModal} style={{ textDecoration: 'none' }}>
            <div>
              <span>{task.name} ({task.category})</span>
              <Insignia task={task} />
            </div>
            <TaskProgressBar task={task} />
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>;

  return (
    <Task
      show={showModal}
      handleClose={hideEditTask}
      head={task.name}
      body={renderedBody}
      footer={renderedFooter}
      trigger={renderedTrigger}
    />
  );
}