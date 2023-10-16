import { useSelector } from "react-redux"
import { useFetchTasksQuery } from "../store";
import DashboardColumnTable from "../components/DashboardColumnTable";
import TaskCreation from "../components/task/TaskCreation";
import RadioGroup from "../components/custom/radioGroup/RadioGroup";
import {useState} from "react";

function DashboardPage() {

  const { data, error, isFetching } = useFetchTasksQuery();

  const isAdmin = useSelector((state) => state.auth.data.is_admin);

  const [orderParam, setOrderParam] = useState('category');

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
        columns: [{ name: columnName("Очікування", 1), status: 1 }, { name: columnName("В роботі", 2), status: 2 }]
      },
      {
        name: "Коректування",
        columns: [{ name: columnName("Очікування", 3), status: 3 }, { name: columnName("В роботі", 4), status: 4 }]
      },
      {
        name: "ВТК",
        columns: [{ name: columnName("Очікування", 5), status: 5 }, { name: columnName("В роботі", 6), status: 6 }]
      },
      {
        name: "Завершено",
        columns: [{ name: columnName("Виконано", 7), status: 7 }]
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
        orderParam={orderParam}
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
      <RadioGroup
        value={orderParam}
        setValue={setOrderParam}
        label="Сортування"
        options={[{value: 'category', label: 'категорія'}, {value: 'name', label: 'номенклатура'} ]}
      />
      {content}
    </div>
  )
}

export default DashboardPage;