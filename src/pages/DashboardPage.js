import { useSelector } from "react-redux"
import { useFetchTasksQuery } from "../store";
import TaskCreation from "../components/task/TaskCreation";
import {useState} from "react";
import TaskSievePanel from "../components/task/TaskSievePanel";
import TaskDetails from "../components/task/TaskDetails";
import Table from "../components/custom/table/Table";

function DashboardPage() {

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
    const dashboardTablesData = [
      { name: columnName("Очікування задачі", "EDITING_QUEUE"), status: "EDITING_QUEUE" },
      { name: columnName("Задачі в роботі", "EDITING"), status: "EDITING" },
      { name: columnName("Очікування коректування", "CORRECTING_QUEUE"), status: "CORRECTING_QUEUE" },
      { name: columnName("Коректування в роботі", "CORRECTING"), status: "CORRECTING" },
      { name: columnName("Очікування ВТК", "TC_QUEUE"), status: "TC_QUEUE" },
      { name: columnName("ВТК в роботі", "TC"), status: "TC" },
      { name: columnName("Виконано", "DONE"), status: "DONE" },
    ];


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