import { useSelector } from "react-redux"
import { authApi } from "../store/apis/authApi";
import { useFetchTasksQuery } from "../store";
import DashboardColumnTable from "../components/DashboardColumnTable";

function DashboardPage() {

  const { data, error, isFetching } = useFetchTasksQuery();

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
      return <DashboardColumnTable key={table.name} tableName={table.name} columns={table.columns} data={data.data} />
    });

    content =
      <div className="row">
        {renderedDashboardTables}
      </div>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default DashboardPage;