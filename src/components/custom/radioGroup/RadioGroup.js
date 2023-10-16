export default function RadioGroup ({ value, setValue, label, options }) {

  const handleClick = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>{label}:</div>
      {options.map(
          option => <div key={option.value}>
            <input type="radio" value={option.value} checked={value === option.value} onChange={handleClick} />
            <span> {option.label} </span>
          </div>
        )}
    </>
  )
}