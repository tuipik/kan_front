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
    renderedDepartments = <div>Заванаження департаментів...</div>
  } else {
    console.log(error);
    renderedDepartments = <div>Помилка завантаженяя департаментів</div>
  }

  return (
    <>
      <h5 className="text-center">Список департаментів:</h5>
      {renderedDepartments}
    </>
  );
}