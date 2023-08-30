import { useState } from 'react';
import './input.css';
import classNames from 'classnames';

export default function Input({ label, onChange, errorMessage, className, ...inputProps }) {

  const [focused, setFocused] = useState(false);

  const handleOnBlur = () => setFocused(true);

  const inputClasses = classNames(
    'form-control kan',
    className,
  );

  return (
    <div className="mb-3">
      <label className="form-label kan">{label}</label>
      <input 
        {...inputProps}
        className={inputClasses}
        onChange={onChange}
        focused={focused.toString()}
        onBlur={handleOnBlur}

      />
      {focused ? <span className="kan">{errorMessage}</span> : ''}
    </div>
  );
}