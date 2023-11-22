import Input from "../custom/input/Input";
import {useState} from "react";
import {useCreateDepartmentMutation, useUpdateDepartmentMutation} from "../../store";
import useShowErrors from "../../hooks/use-show-errors";
import useShowSuccess from "../../hooks/use-show-success";
import useAccountsSelect from "../../hooks/use-accounts-select";
import Checkbox from "../custom/checkbox/Checkbox";

export default function DepartmentForm({ handleClose, incomeDepartment, create }) {

  const [department, setDepartment] = useState(incomeDepartment);

  const mutation = create ? useCreateDepartmentMutation : useUpdateDepartmentMutation;

  const [doMutation, data] = mutation();

  const showErrors = useShowErrors();

  const showSuccess = useShowSuccess();

  const handleSubmit = (e) => {
    e.preventDefault();
    doMutation(department)
      .unwrap()
      .then((result) => {
        showSuccess({body: `Відділ ${department.name} успішно збережено`});
        handleClose();
      })
      .catch((error) => {
        showErrors(error.data);
      })
    ;
  };

  const handleAttrChange = (event) => {
    const attr = event.target.id;
    const value = event.target.multiple ?
      Array.from(event.target.selectedOptions, option => option.value)
      : event.target.value;
    setDepartment({...department, [attr]: value});
  };

  // TODO use custom <Select /> below
  let renderedUserSelect = useAccountsSelect(
    {
      user: department.head,
      id: "head",
      label: "Обрати керівника",
      handleAttrChange
    });


  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="name"
        placeholder="Назва"
        defaultValue={incomeDepartment.name}
        onChange={handleAttrChange}
        type="text"
        required
      />
      <div className="mb-3">{!create && renderedUserSelect}</div>
      <Checkbox
        value={department.is_verifier}
        onChange={() => setDepartment({...department, is_verifier: !department.is_verifier})}
        id="is_verifier"
        label="Перевіряючий відділ"
      />
      <button className="btn btn-primary">{data.isLoading ? 'Збереження...' : 'Зберегти'}</button>
    </form>
  )
}