import Input from "../input/Input";
import {useState} from "react";
import {useCreateDepartmentMutation} from "../../store";
import useShowErrors from "../../hooks/use-show-errors";
import useShowSuccess from "../../hooks/use-show-success";
import useAccountsSelect from "../../hooks/use-accounts-select";
import Checkbox from "../checkbox/Checkbox";

export default function DepartmentForm({ handleClose, incomeDepartment }) {

  const [department, setDepartment] = useState(incomeDepartment);

  const [doCreateDepartment, data] = useCreateDepartmentMutation();

  const showErrors = useShowErrors();

  const showSuccess = useShowSuccess();


  const handleSubmit = (e) => {
    e.preventDefault();
    doCreateDepartment(department)
      .unwrap()
      .then((result) => {
        showSuccess({body: `Департамент ${department.name} успішно створено`});
        handleClose();
      })
      .catch((error) => {
        showErrors(error.data);
      })
    ;
  };

  const handleAttrChange = (event) => {
    const attr = event.target.id;
    const value = event.target.value;
    setDepartment({...department, [attr]: value});
  };

  const renderedUserSelect = useAccountsSelect({user: department.head, id: "head", handleAttrChange});

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="name"
        placeholder="Назва"
        required
        onChange={handleAttrChange}
      />
      <div className="mb-3">{renderedUserSelect}</div>
      <Checkbox value={department.is_verifier} onChange={handleAttrChange} id="is_verifier" label="Перевіряючий відділ" />
      <Input
        id="ordering"
        placeholder="Номер в черзі відображення"
        value={department.ordering}
        onChange={handleAttrChange}
        type="number"
        required
      />
      <button className="btn btn-primary">{data.isLoading ? 'Створення...' : 'Створити'}</button>
    </form>
  )
}