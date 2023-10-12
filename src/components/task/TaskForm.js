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
import useRerender from "../../hooks/use-rerender";

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

  const [taskNameRegexp, setTaskNameRegexp] = useState('^.+$');
  const [taskNameExample, setTaskNameExample] = useState('');

  const {data: currentUser} = useSelector((state) => {
    return state.auth;
  });

  const {settings, isFetchingSettings, settingsError} = useSettings();

  const [task, setTask] = useState(incomeTask);
  const [updatedFields, setUpdatedFields] = useState({});

  const [accountsQueryParams, setAccountsQueryParams] = useState({'department__id': task.department});
  const {
    data: accounts,
    error: accountsErrors,
    isFetching: isAccountsFetching
  } = useFetchAccountsQuery(accountsQueryParams, {skip: !task.department});

  const [selectsKey, rerenderSelects] = useRerender();

  const showErrors = useShowErrors();

  const showSuccess = useShowSuccess();

  const handleAttrChange = (event) => {
    const attr = event.target.id;
    const value = event.target.value;

    setTask({...task, [attr]: value});
    if (formType === UPDATE_TYPE) {
      setUpdatedFields({...updatedFields, [attr]: value})
    }
  };

  const handleScaleChange = (event) => {
    handleAttrChange(event);
    setTaskNameRegexp(settings.TASK_NAME_REGEX[event.target.value][0]);
    setTaskNameExample(settings.TASK_NAME_REGEX[event.target.value][1]);
  };

  const handleDepartmentChange = (event) => {
    handleAttrChange(event);
    setAccountsQueryParams({'department__id': event.target.value})
  };

  const handleStatusChange = (event) => {
    const attr = event.target.id;
    const value = event.target.value;

    setTask({...task, [attr]: value, user: null, user_obj: null});

    if (formType === UPDATE_TYPE) {
      setUpdatedFields({...updatedFields, [attr]: value});
    }

    setAccountsQueryParams({'department__statuses__id': value})
    rerenderSelects();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let mutation = formType === CREATE_TYPE ? doCreateTask(task) : doUpdateTask({taskId: task.id, updatedFields});

    mutation
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
      errorMessage: `Назва має бути наступного формату: ${taskNameRegexp}, нариклад ${taskNameExample}`,
      pattern: taskNameRegexp,
      required: true
    },
    {
      label: "Категорія",
      id: "category",
      value: task.category,
      errorMessage: "Мінімальна довжина 3 символи, максимальна довжина 255 символів",
      pattern: "^.{3,255}$",
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
      label: "Час на ВТК",
      id: "otk_time_estimate",
      value: task.otk_time_estimate,
      type: "number",
      min: 3,
      max: 2000,
      required: true,
    }
  ];

  const selectData = [];
  const isTaskFromUsersDepartment = (currentUser.department === task.department);

  if (settings?.STATUSES && (currentUser.is_admin || isTaskFromUsersDepartment)) {
    selectData.push(
      {
        id: "status",
        value: task.status,
        onChange: handleStatusChange,
        data: settings.STATUSES.reduce(
          (obj, status_obj) => (obj[status_obj.id] = status_obj.translation, obj), {}
        ),
        isFetching: isFetchingSettings,
        label: "статус",
        error: settingsError,
      }
    );
  }

  if (currentUser.is_admin) {
    selectData.push(
      {
        id: "quarter",
        value: task.quarter,
        onChange: handleAttrChange,
        data: settings?.YEAR_QUARTERS,
        isFetching: isFetchingSettings,
        label: "квартал",
        error: settingsError,
      },
      {
        id: "scale",
        value: task.scale,
        onChange: handleScaleChange,
        data: settings?.TASK_SCALES,
        isFetching: isFetchingSettings,
        label: "масштаб",
        error: settingsError,
      },
    );

    if (formType === CREATE_TYPE) {
      selectData.push(
        {
          id: "department",
          value: task.department,
          onChange: handleDepartmentChange,
          data: departments?.data ?
            departments.data.reduce(
              (obj, department) => (obj[department.id] = department.name, obj), {}
            ) : null,
          isFetching: isDepartmentsFetching,
          label: "відділ",
          error: departmentsErrors,
        }
      )
    }
  }

  if (( isTaskFromUsersDepartment) || currentUser.is_admin) {
    if (accounts?.data && task.department) {
      selectData.push(
        {
          id: "user",
          value: task.user,
          onChange: handleAttrChange,
          data: accounts.data.reduce(
            (obj, account) => (obj[account.id] = <UserInfo data={account}/>, obj), {}
          ),
          isFetching: isAccountsFetching,
          label: "користувача",
          error: accountsErrors,
          disabled: !task.department,
        }
      );
    }
  }

  const renderedInputs = inputsData.map(
    data => <Input {...data} onChange={handleAttrChange} key={data.id}/>
  );

  let renderedSelects;
  if (departments && settings) {
    renderedSelects = selectData.map(data => <Select
      {...data}
      key={data.id}
      error={settingsError}
    />);
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(task);
    console.log(updatedFields)
    rerenderSelects();
  }

  return (
    <form onSubmit={handleSubmit}>
      {currentUser.is_admin && renderedInputs}
      <div key={selectsKey}>{renderedSelects}</div>
      <button
        className="btn btn-primary">{createTaskData.isLoading || updateTaskData.isLoading ? 'Збереження...' : 'Зберегти'}</button>
      {/*<button onClick={handleClick}>show data</button>*/}
    </form>
  );
}

export {CREATE_TYPE, UPDATE_TYPE};
export default TaskForm;