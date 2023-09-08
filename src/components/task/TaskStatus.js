import useShowErrors from "../../hooks/use-show-errors";
import useShowSuccess from "../../hooks/use-show-success";
import { useUpdateTaskMutation } from "../../store";
import Select from "../custom/select/Select";
import useSettings from "../../hooks/use-settings";

export default function TaskStatus( { task }) {
  const [doUpdate, data] = useUpdateTaskMutation();

  const {settings, isFetchingSettings, settingsError} = useSettings();

  let statusesData;

  if (settings) {
    statusesData = settings.TASK_STATUSES;
  }

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

  const renderedStatus = <Select
    id="status"
    value={task.status}
    data={statusesData}
    label="статус"
    onChange={handleStatusSelect}
    isFetching={isFetchingSettings}
    error={settingsError}
  />

  return (
    <>
      <div><b>Статус:</b></div>
      <div>{renderedStatus}</div>
    </>
  );
}