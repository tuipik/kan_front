import {useFetchDepartmentsQuery} from "../../store";
import Department from "./Department";

export default function DepartmentList() {
  const {data, error, isFetching} = useFetchDepartmentsQuery();

  let renderedDepartments;

  if (data?.data) {
    renderedDepartments =
      <ul className="list-group list-group-flush">
        {
          data.data.map((department) => <li className="list-group-item" key={department.id}>
            <Department department={department}/>
          </li>)
        }
      </ul>;
  } else if (isFetching) {
    renderedDepartments = <div>Заванаження відділів...</div>
  } else {
    console.log(error);
    renderedDepartments = <div>Помилка завантаженяя відділів</div>
  }

  return (
    <>
      <h5 className="text-center">Список відділів:</h5>
      {renderedDepartments}
    </>
  );
}