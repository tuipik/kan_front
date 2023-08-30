import useShowErrors from "../../hooks/use-show-errors";
import useShowSuccess from "../../hooks/use-show-success";
import { useUpdateTaskMutation } from "../../store";
import { translatedTaskaskStatuses } from "../../translations";

export default function TaskStatus( { task }) {
  const [doUpdate, data] = useUpdateTaskMutation();

  const showSuccess = useShowSuccess();
  const showErrors = useShowErrors();

  const handleStatusSelect = (event) => {
    const newStatus = event.target.value;
    doUpdate({task, status: newStatus, user: task.user.id})
      .unwrap()
      .then((result) => {
        const newStatus = result.data[0].status_display_value;
        showSuccess(
          {
            body: `Статус задачі ${task.name } успішно змінено на "${newStatus}"`
          });
      })
      .catch((error) => {
        showErrors(error.data);
      });
  }

  const renderedStatus = <select value={task.status} onChange={handleStatusSelect} className="form-select">
    {Object.entries(translatedTaskaskStatuses).map((key, value) => {
      return <option id={key[0]} value={key[0]} key={key[0]}>{key[1]}</option>;
    })}
  </select>;

  return (
    <div><b>Статус:</b> {renderedStatus}</div>
  );
}