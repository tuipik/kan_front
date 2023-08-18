import SortableTable from "./SortableTable";
import TaskDetails from "./task/TaskDetails";

export default function DashboardColumnTable({ tableName, columns, data }) {

  const config = columns.map((column) => {
    return {
      label: column.name,
      render: (task) => {
        if (task.status === column.status)
          return <TaskDetails task={task} />
      },
    }
  });

  const keyFn = (task) => {
    return task.id;
  };

  return (
    <div className="col">
      <h5 style={{'textAlign': 'center'}}>{tableName}</h5>
      <SortableTable data={data} config={config} keyFn={keyFn} striped />
    </div>
  );
}