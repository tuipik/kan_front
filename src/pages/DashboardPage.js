import { useSelector } from "react-redux"
import { useFetchTasksQuery } from "../store";
import TaskCreation from "../components/task/TaskCreation";
import {useState} from "react";
import TaskSievePanel from "../components/task/TaskSievePanel";
import TaskDetails from "../components/task/TaskDetails";
import Table from "../components/custom/table/Table";
import useSettings from "../hooks/use-settings";

function DashboardPage() {

  const {settings, isFetchingSettings, settingsError} = useSettings();

  const isAdmin = useSelector((state) => state.auth.data.is_admin);

  const [queryParams, setQueryParams] = useState({year: new Date().getFullYear()});

  const { data, error, isFetching } = useFetchTasksQuery(queryParams);

  const renderedCreateBtn = isAdmin ? <TaskCreation /> : '';

  let content;

  const columnName = (name, status) => {
    const taskCount = data.data.reduce(
      (count, task) => task.status === status ? count + 1: count, 0
    );
    return !!taskCount? `${name} (${taskCount})` : name;
  };

  if (isFetching) {
    content = <div>Завантаженя...</div>
  } else if (error) {
    content = <div style={{color: 'red'}}>Помилка завантаження задач</div>
  } else {
    const dashboardTablesData = settings?.TASK_STATUSES && Object.entries(
      settings.TASK_STATUSES).map(
        ([status, translation]) => {
          return { name: columnName(translation, status), status};
        }
      );

    const config = dashboardTablesData.map((column) => {
      return {
        label: column.name,
        render: (task) => {
          if (task.status === column.status)
            return <TaskDetails task={task} />
        }
      }
    });

    content =
      <Table
        data={data.data}
        config={config}
        keyFn={(task) => task.id}
        equalColumns={true}
        classes="table table-bordered table-striped"
      />
  };

  return (
    <div>
      {renderedCreateBtn}
      <TaskSievePanel
        queryParams={queryParams}
        changeQueryParams={setQueryParams}
      />
      {content}
    </div>
  )
}

export default DashboardPage;