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

const setOverdueStyles = (styles, statuses, task, prefix) => {
  const doneTimeKey = `${prefix}_time_done`;
  const estimateTimeKey = `${prefix}_time_estimate`;
  if (statuses.includes(task.status) && task[doneTimeKey] >= task[estimateTimeKey]){
    styles.background = 'rgb(256 0 0 / 0.4)';
  }
}

const getTaskStyles = (task) => {
  const styles = {display: "flex", justifyContent: "center", padding: 8};

  if (['EDITING', 'CORRECTING', 'VTK'].includes(task.status)) {
    styles.background = "rgb(67 208 72 / 0.25)";
  }
  if (task.status === 'DONE') {
    styles.background = "rgb(179 204, 204)";
  }
  // Check is corrector return to editor
  if (
    ['EDITING_QUEUE', 'EDITING'].includes(task.status) &&
    task.involved_users.length > 1
  ) {
    for(const user of task.involved_users) {
      if (user.role === 'CORRECTOR') {
        styles.background = "rgb(205 209 30 / 0.73)";
        break;
      }
    }
  }

  setOverdueStyles(styles,['EDITING_QUEUE', 'EDITING'], task, 'editing');
  setOverdueStyles(styles, ['CORRECTING_QUEUE', 'CORRECTING'], task, 'correcting');
  setOverdueStyles(styles, ['VTK_QUEUE', 'VTK'], task, 'tc');

  return styles;
}

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

  const renderedTrigger =
    <Card>
      <Card.Body style={getTaskStyles(task)}>
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