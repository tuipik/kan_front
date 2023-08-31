import { Button } from "react-bootstrap";
import Input from "../input/Input";
import {useState} from "react";
import {useCreateDepartmentMutation} from "../../store";
import useShowErrors from "../../hooks/use-show-errors";
import useShowSuccess from "../../hooks/use-show-success";

export default function DepartmentForm({ handleClose }) {

  const [name, setName] = useState('');

  const [doCreateDepartment, data] = useCreateDepartmentMutation();

  const showErrors = useShowErrors();

  const showSuccess = useShowSuccess();

  const handleSubmit = (e) => {
    e.preventDefault();
    doCreateDepartment(name)
      .unwrap()
      .then((result) => {
        console.log(result);
        showSuccess({body: `Департамент ${name} успішно створено`});
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data.errors);
        showErrors(error.data);
      })
    ;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="name"
        placeholder="Назва"
        required
        onChange={handleNameChange}
      />
      <button className="btn btn-primary">{data.isLoading ? 'Створення...' : 'Створити'}</button>
    </form>
  )
}