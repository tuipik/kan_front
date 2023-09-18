import { useSelector } from "react-redux"
import { useFetchTasksQuery } from "../store";
import DashboardColumnTable from "../components/DashboardColumnTable";
import TaskCreation from "../components/task/TaskCreation";

function DashboardPage() {

  const { data, error, isFetching } = useFetchTasksQuery();

  const isAdmin = useSelector((state) => state.auth.data.is_admin);

  const renderedCreateBtn = isAdmin
    ? <TaskCreation />
    : '';

  let content;

  if (isFetching) {
    content = <div>Завантаженя...</div>
  } else if (error) {
    content = <div style={{color: 'red'}}>Помилка завантаження задач</div>
  } else {
    const dashboardTablesData = [
      {
        name: "Задачі",
        columns: [{ name: "Очікування", status: "WAITING" }, { name: "В роботі", status: "IN_PROGRESS" }]
      },
      {
        name: "Коректування",
        columns: [{ name: "Очікування", status: "CORRECTING_QUEUE" }, { name: "В роботі", status: "CORRECTING" }]
      },
      {
        name: "ОТК",
        columns: [{ name: "Очікування", status: "OTK_QUEUE" }, { name: "В роботі", status: "OTK" }]
      },
      {
        name: "Завершено",
        columns: [{ name: "Виконано", status: "DONE" }]
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
  }

  return (
    <div>
      {renderedCreateBtn}
      {content}
    </div>
  )
}

export default DashboardPage;