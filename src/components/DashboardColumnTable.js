import SortableTable from "./custom/table/SortableTable";
import TaskDetails from "./task/TaskDetails";

export default function DashboardColumnTable({ tableName, columns, data, orderParam }) {

  const config = columns.map((column) => {
    return {
      label: column.name,
      render: (task) => {
        if (task.status === column.status)
          return <TaskDetails task={task} />
      },
      sortValue: (task) => task[orderParam]
    }
  });

  return (
    <div className="col">
      <h5 style={{'textAlign': 'center'}}>{tableName}</h5>
      <SortableTable
        data={data}
        config={config}
        keyFn={(task) => task.id}
        classes="table table-bordered table-striped"
      />
    </div>
  );
}