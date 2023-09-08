import {useState} from "react";

export default function Checkbox({value, id, onChange, label}) {

  const [isChecked, setIsChecked] = useState(value);

  const handleChange = (event) => {
    setIsChecked((currentIsChecked) => {
      event.target.value = !currentIsChecked;
      onChange(event);
      return !currentIsChecked;
    })
  };

  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id={id} checked={isChecked} onChange={handleChange} />
      <label className="form-check-label mb-2" htmlFor="flexCheckDefault">{label}</label>
    </div>
  );
}