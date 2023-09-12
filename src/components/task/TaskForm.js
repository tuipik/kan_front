import {useState} from "react";
import {
  useCreateTaskMutation,
  useFetchAccountsQuery,
  useFetchDepartmentsQuery,
  useFetchSettingsQuery
} from "../../store";
import useShowErrors from "../../hooks/use-show-errors";
import Input from "../custom/input/Input";
import useShowSuccess from "../../hooks/use-show-success";
import TaskModel from "./TaskModel";
import Select from "../custom/select/Select";
import UserInfo from "../user/UserInfo";
import useSettings from "../../hooks/use-settings";

export default function TaskForm({handleClose}) {

  const {data: departments, error: departmentsErrors, isFetching: isDepartmentsFetching} = useFetchDepartmentsQuery();

  const [doCreateTask, createTaskData] = useCreateTaskMutation();

  const {settings, isFetchingSettings, settingsError} = useSettings();

  let scaleSelectData, quarterSelectData, departmentsSelectData, accountsSelectData;

  if (settings) {
    scaleSelectData =  settings.TASK_SCALES;
    quarterSelectData = settings.YEAR_QUARTERS;
  }

  const [newTask, setNewTask] = useState(new TaskModel());
  const { data: accounts, error: accountsErrors, isFetching: isAccountsFetching } = useFetchAccountsQuery(newTask.department, {skip: !newTask.department});

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
        showSuccess({body});
      })
      .catch((error) => {
        showErrors(error.data);
      })
    ;
  };

  if (accounts?.data) {
    accountsSelectData = accounts.data.reduce(
      (obj, account) => (obj[account.id] = <UserInfo data={account}/>, obj), {}
    );
  }
  if (departments?.data) {
    departmentsSelectData = departments.data.reduce(
      (obj, department) => (obj[department.id] = department.name, obj), {}
    );
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
      placeholder: "Час на оновлення",
      id: "change_time_estimate",
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    },
    {
      placeholder: "Час на коректуру",
      id: "correct_time_estimate",
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    },
    {
      placeholder: "Час на ОТК",
      id: "otk_time_estimate",
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    }
  ];

  const selectData = [
    {
      id: "quarter",
      value: newTask.quarter,
      data: quarterSelectData,
      isFetching: isFetchingSettings,
      label: "квартал",
      error: settingsError,
    },
    {
      id: "scale",
      value: newTask.scale,
      data: scaleSelectData,
      isFetching: isFetchingSettings,
      label:"масштаб",
      error: settingsError,
    },
    {
      id: "department",
      value: newTask.department,
      data: departmentsSelectData,
      isFetching: isDepartmentsFetching,
      label: "відділ",
      error: departmentsErrors,
    },
    {
      id: "user",
      value: newTask.user,
      data: accountsSelectData,
      isFetching: isAccountsFetching,
      label: "користувача",
      error: accountsErrors,
      disabled: !newTask.department,
    }
  ]

  const renderedInputs = inputsData.map((data) => <Input {...data} onChange={handleAttrChange} key={data.id}/>);
  const renderedSelects = selectData.map((data) => <Select
    {...data}
    key={data.id}
    onChange={handleAttrChange}
    error={settingsError}
  />);

  return (
    <form onSubmit={handleSubmit}>
      {renderedInputs}
      {renderedSelects}
      <button className="btn btn-primary">{createTaskData.isLoading ? 'Відправка...' : 'Створити'}</button>
    </form>
  );
}