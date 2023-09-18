import { useState } from 'react';
import './input.css';
import classNames from 'classnames';

export default function Input({ label, onChange, errorMessage, className, id, ...inputProps }) {

  const [focused, setFocused] = useState(false);

  const handleOnBlur = () => setFocused(true);

  const inputClasses = classNames(
    'form-control kan mb-3',
    className,
  );

  return (
    <div className="form-floating">
      <input
        {...inputProps}
        id={id}
        className={inputClasses}
        onChange={onChange}
        focused={focused.toString()}
        onBlur={handleOnBlur}
      />
      <label htmlFor={id}>{label}</label>
      {focused ? <span className="kan">{errorMessage}</span> : ''}
    </div>
  );
}