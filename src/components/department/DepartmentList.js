import {useFetchDepartmentsQuery} from "../../store";
import Department from "./Department";
import DepartmentCreation from "./DepartmentCreation";

export default function  DepartmentList () {
  const { data: {data}, error, isFetching } = useFetchDepartmentsQuery();

  const renderedDepartments =
    <ol>
      { data.map((department) => <li key={department.id}><Department data={department} /></li>) }
    </ol>;

  return (
    <>
      <br />
      <DepartmentCreation />
      <br />
      <br />
      <h5 className="text-center">Список департаментів:</h5>
      {renderedDepartments}
    </>
  )
}