import { useSelector } from "react-redux"
import { useFetchTasksQuery } from "../store";
import DashboardColumnTable from "../components/DashboardColumnTable";
import TaskCreation from "../components/task/TaskCreation";
import {useState} from "react";
import TaskSievePanel from "../components/task/TaskSievePanel";

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
      {
        name: "Задачі",
        columns: [
          { name: columnName("Очікування", "EDITING_QUEUE"), status: "EDITING_QUEUE" },
          { name: columnName("В роботі", "EDITING"), status: "EDITING" }]
      },
      {
        name: "Коректування",
        columns: [
          { name: columnName("Очікування", "CORRECTING_QUEUE"), status: "CORRECTING_QUEUE" },
          { name: columnName("В роботі", "CORRECTING"), status: "CORRECTING" }]
      },
      {
        name: "ВТК",
        columns: [
          { name: columnName("Очікування", "TC_QUEUE"), status: "TC_QUEUE" },
          { name: columnName("В роботі", "TC"), status: "TC" }]
      },
      {
        name: "Завершено",
        columns: [{ name: columnName("Виконано", "DONE"), status: "DONE" }]
      }
    ];

    const renderedDashboardTables = dashboardTablesData.map((table) => {
      const tableData = data.data.filter((task) => {
        const tableStatuses = table.columns.map((column) => column.status);
        return tableStatuses.includes(task.status);
      });
      return <DashboardColumnTable
        key={table.name}
        tableName={table.name}
        columns={table.columns}
        data={tableData}
      />
    });

    content =
      <div className="row">
        {renderedDashboardTables}
      </div>
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