import {useState} from "react";

export default function Checkbox({value, id, onChange, label}) {

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        checked={value}
        onChange={onChange}
      />
      <label className="form-check-label mb-2" htmlFor="flexCheckDefault">{label}</label>
    </div>
  );
}