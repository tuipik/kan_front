import DepartmentList from "../components/department/DepartmentList";
import DepartmentCreation from "../components/department/DepartmentCreation";

export default function DepartmentsPage() {
  return (
    <>
      <br />
      <DepartmentCreation />
      <br />
      <br />
      <DepartmentList />
    </>
  );
}