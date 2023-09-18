import UserInfo from "../user/UserInfo";

export default function TaskMainInfo({ task }) {
  return (
    <div className="col">
      <div><b>Виконавець: </b><UserInfo data={task.user_obj} /></div>
      <div><b>Категорія: </b>{task.category}</div>
      <div><b>Квартал: </b>{task.quarter_display_value}</div>
      <div><b>Масштаб: </b>{task.scale_display_value}</div>
      <div><b>Статус: </b>{task.status_display_value}</div>
      <div><b>Створено: </b><i>{task.created}</i></div>
      <div><b>Оновлено: </b><i>{task.updated}</i></div>
    </div>
  );
}