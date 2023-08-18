import UserInfo from "../UserInfo";

export default function TaskMainInfo({ task }) {
  return (
    <div className="col">
      <br />
      <br />
      <div><b>Виконавець: </b><UserInfo data={task.user} /></div>
      <div><b>Категорія: </b>{task.category}</div>
      <div><b>Квартал: </b>{task.quarter_display_value}</div>
      <div><b>Створено: </b><i>{task.created}</i></div>
      <div><b>Оновлено: </b><i>{task.updated}</i></div>
    </div>
  );
}