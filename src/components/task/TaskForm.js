import {useState} from "react";
import {
  useCreateTaskMutation,
  useFetchAccountsQuery,
  useFetchDepartmentsQuery, useUpdateTaskMutation,
} from "../../store";
import useShowErrors from "../../hooks/use-show-errors";
import Input from "../custom/input/Input";
import useShowSuccess from "../../hooks/use-show-success";
import Select from "../custom/select/Select";
import UserInfo from "../user/UserInfo";
import useSettings from "../../hooks/use-settings";
import {useSelector} from "react-redux";

const CREATE_TYPE = 'create';
const UPDATE_TYPE = 'update';

function TaskForm({handleClose, incomeTask, formType}) {

  if (!formType) {
    throw Error("formType should be provided");
  }
  if (![CREATE_TYPE, UPDATE_TYPE].includes(formType)) {
    throw Error(`formType value must be ${CREATE_TYPE} or ${UPDATE_TYPE}`);
  }

  const {data: departments, error: departmentsErrors, isFetching: isDepartmentsFetching} = useFetchDepartmentsQuery();

  const [doCreateTask, createTaskData] = useCreateTaskMutation();
  const [doUpdateTask, updateTaskData] = useUpdateTaskMutation();

  const { data: {is_admin, is_head_department, department} } = useSelector((state) => {
    return state.auth;
  });

  const {settings, isFetchingSettings, settingsError} = useSettings();

  const [task, setTask] = useState(incomeTask);
  const { data: accounts, error: accountsErrors, isFetching: isAccountsFetching } = useFetchAccountsQuery(task.department, {skip: !task.department});

  const showErrors = useShowErrors();

  const showSuccess = useShowSuccess();

  const handleAttrChange = (event) => {
    const attr = event.target.id;
    const value = event.target.value;

    setTask({...task, [attr]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let mutation = doUpdateTask;
    if (formType === CREATE_TYPE) {
      mutation = doCreateTask;
    }

    mutation(task)
      .unwrap()
      .then((result) => {
        const body = `Задача ${result.data[0].name} успішно збережена`;
        handleClose();
        showSuccess({body});
      })
      .catch((error) => {
        showErrors(error.data);
      })
    ;
  };

  const inputsData = [
    {
      label: "Назва",
      id: "name",
      value: task.name,
      errorMessage: "Назва має бути наступного формату: ^[A-Z]-\d{1,3}-\d{1,3}-[A-Z]$, нариклад M-36-99-A",
      pattern: "^[A-Z]-\\d{1,3}-\\d{1,3}-[A-Z]$",
      required: true
    },
    {
      label: "Категорія",
      id: "category",
      value: task.category,
      errorMessage: "Мінімальна довжина 3 символи, максимальна довжина 16 символів",
      pattern: "^.{3,16}$",
      required: true
    },
    {
      label: "Час на оновлення",
      id: "change_time_estimate",
      value: task.change_time_estimate,
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    },
    {
      label: "Час на коректуру",
      id: "correct_time_estimate",
      value: task.correct_time_estimate,
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    },
    {
      label: "Час на ОТК",
      id: "otk_time_estimate",
      value: task.otk_time_estimate,
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    }
  ];

  const selectData = [];
  if ((department.id === task.department) || is_admin) {
    selectData.push(
      {
        id: "status",
        value: task.status,
        data: settings?.TASK_STATUSES,
        isFetching: isFetchingSettings,
        label: "статус",
        error: settingsError,
      }
    );
  }

  if (is_admin) {
    selectData.push(
      {
        id: "quarter",
        value: task.quarter,
        data: settings?.YEAR_QUARTERS,
        isFetching: isFetchingSettings,
        label: "квартал",
        error: settingsError,
      },
      {
        id: "scale",
        value: task.scale,
        data: settings?.TASK_SCALES,
        isFetching: isFetchingSettings,
        label:"масштаб",
        error: settingsError,
      },
      {
        id: "department",
        value: task.department,
        data: departments?.data ?
          departments.data.reduce(
            (obj, department) => (obj[department.id] = department.name, obj), {}
          ) : null,
        isFetching: isDepartmentsFetching,
        label: "відділ",
        error: departmentsErrors,
      }
    );
  }

  if ((is_head_department && department.id === task.department) || is_admin) {
    if (accounts?.data && task.department) {
      selectData.push(
        {
          id: "user",
          value: task.user,
          data: accounts?.data ? accounts.data.reduce(
            (obj, account) => (obj[account.id] = <UserInfo data={account}/>, obj), {}
          ) : null,
          isFetching: isAccountsFetching,
          label: "користувача",
          error: accountsErrors,
          disabled: !task.department,
        }
      );
    }
  }

  const renderedInputs = inputsData.map(
    (data) => <Input {...data} onChange={handleAttrChange} key={data.id}/>
  );

  let renderedSelects;
  if ( departments && settings ) {
    renderedSelects = selectData.map((data) => <Select
      {...data}
      key={data.id}
      onChange={handleAttrChange}
      error={settingsError}
    />);
  }

  return (
    <form onSubmit={handleSubmit}>
      {is_admin && renderedInputs}
      {renderedSelects}
      <button className="btn btn-primary">{createTaskData.isLoading || updateTaskData.isLoading ? 'Збереження...' : 'Зберегти'}</button>
    </form>
  );
}

export {CREATE_TYPE, UPDATE_TYPE};
export default TaskForm;