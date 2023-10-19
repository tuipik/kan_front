export default function RadioGroup ({ value, setValue, label, options, inline }) {

  const style = inline ? {display: 'inline'} : {};

  return (
    <>
      <div>{label}:</div>
      {options.map(
          option => <div key={option.value} style={style}>
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onClick={setValue}
            />
            <span> {option.label} </span>
          </div>
        )}
    </>
  )
}