export default function CheckboxGroup ({ values, setValue, label, options, inline }) {

  const style = inline ? {display: 'inline'} : {};


  return (
    <>
      <div style={style}>{label}</div>
      {options.map(
          option => <div key={option.value} style={style}>
            <input
              type="checkbox"
              value={option.value}
              checked={values.has(option.value)}
              onClick={setValue}
            />
            <span> {option.label} </span>
          </div>
        )}
    </>
  )
}