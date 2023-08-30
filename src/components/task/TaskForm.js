import { useState } from "react";
import { showToast, useCreateTaskMutation, useFetchAccountsQuery, useFetchDepartmentsQuery } from "../../store";
import UserInfo from "../UserInfo";
import useShowErrors from "../../hooks/use-show-errors";
import Input from "../input/Input";
import useShowSuccess from "../../hooks/use-show-success";

class TaskModel {
  name = "";
  change_time_estimate = 0;
  correct_time_estimate = 0;
  otk_time_estimate = 0;
  quarter = "";
  category = "";
  user = null;
  department = null;
}


export default function TaskForm ({ handleClose }) {

  const { data: users, error: accountsErrors, isFetching: isAccountsFetching } = useFetchAccountsQuery();
  const { data: departments, error: departmentsErrors, isFetching: isDepartmentsFetching } = useFetchDepartmentsQuery();

  const [doCreateTask, createTaskData] = useCreateTaskMutation();

  const [newTask, setNewTask] = useState(new TaskModel());
  
  const showErrors = useShowErrors();
  const showSuccess = useShowSuccess();

  const handleAttrChange = (event) => {
    const attr = event.target.id;
    const value = event.target.value;

    setNewTask({...newTask, [attr]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doCreateTask(newTask)
      .unwrap()
      .then((result) => {
        const body = `Задача ${newTask.name} успішно створена`;
        handleClose();
        showSuccess({ body });
      })
      .catch((error) => {
        console.log(error);
        showErrors(error.data);
      })
    ;
  };

  let renderedUserSelect;

  if (users) {
    renderedUserSelect = <select id="user" value={newTask.user} onChange={handleAttrChange} className="form-select">
      <option value={null}>--- Обрати користувача ---</option>
      {users.data.map((user) => {
        return <option key={user.id} value={user.id}><UserInfo data={user} /></option>;
      })}
      </select>

  } else if (isAccountsFetching) {
    renderedUserSelect = <div>Завантаження користувачів...</div>;
  } else {
    console.log(accountsErrors);
  }

  let renderedDepartmentsSelect;

  if (departments) {
    renderedDepartmentsSelect = <select id="department" value={newTask.department} onChange={handleAttrChange} className="form-select">
        <option value={null}>--- Обрати відділ ---</option>
        {departments.data.map((department) => {
          return <option key={department.id} value={department.id}>{department.name}</option>
        })}
      </select>
  } else if (isDepartmentsFetching) {
    renderedDepartmentsSelect = <div>Завантаження відділів...</div>
  } else {
    console.log(departmentsErrors);
  }

  const inputsData = [
    {
      placeholder: "Назва",
      id: "name",
      errorMessage: "Назва має бути наступного формату: ^[A-Z]-\d{1,3}-\d{1,3}-[A-Z]$, нариклад M-36-99-A",
      pattern: "^[A-Z]-\\d{1,3}-\\d{1,3}-[A-Z]$",
      required: true
    },
    {
      placeholder: "Категорія",
      id: "category",
      errorMessage: "Мінімальна довжина 3 символи, максимальна довжина 16 символів",
      pattern: "^.{3,16}$",
      required: true
    },
    {
      placeholder: "Change time?",
      id: "change_time_estimate",
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    },
    {
      placeholder: "Час коректури",
      id: "correct_time_estimate",
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    },
    {
      placeholder: "Час ОТК",
      id: "otk_time_estimate",
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    }

  ];

  const renderedInputs = inputsData.map((data) => <Input {...data} onChange={handleAttrChange} key={data.id} />);

  return (
     <form onSubmit={handleSubmit}>
        {renderedInputs}
        <div className="mb-3">{renderedUserSelect}</div>
        <div className="mb-3">{renderedDepartmentsSelect}</div>
        <div className="mb-3">
          <select id="quarter" value={newTask.quarter} onChange={handleAttrChange} className="form-select">
            <option value={null}>--- Обрати квартель ---</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <button className="btn btn-primary">{createTaskData.isLoading ? 'Відправка...' : 'Створити'}</button>
      </form> 
  );
}