import Table from "../custom/table/Table";

export default function TaskTimeStatuses ({ task }) {

  const data = [
    {name: 'Оновлення', estimate: task.change_time_estimate, fact: task.change_time_done },
    {name: 'Коректування', estimate: task.correct_time_estimate, fact: task.correct_time_done },
    {name: 'ВТК', estimate: task.otk_time_estimate, fact: task.otk_time_done },
  ];

  const config = [
    { label: 'Час', render: (row) => row.name },
    { label: 'Заплановано', render: (row) => row.estimate },
    { label: 'По факту', render: (row) => row.fact },
  ];

  const keyFn = (rowData) => rowData.name;

  return (
    <div className="col">
      <Table
        data={data}
        config={config}
        keyFn={keyFn}
        classes="table table-striped"
      />
    </div>
  )
}