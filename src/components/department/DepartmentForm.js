import { Button } from "react-bootstrap";
import Input from "../input/Input";
import {useState} from "react";
// import {useCreateDepartmentMutation} from "../../store";

export default function DepartmentForm() {

  const [name, setName] = useState('');

  // const dich = useCreateDepartmentMutation();
  // console.log(dich)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
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
      <button className="btn btn-primary">Створити</button>
    </form>
  )
}