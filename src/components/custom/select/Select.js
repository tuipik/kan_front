export default function Select(
  {
    id,
    value,
    onChange,
    disabled,
    data,
    isFetching,
    error,
    label
  }
) {

  let options;
  let fullLabel = `Обрати ${label}`;

  if (data) {
    options = Object.entries(data).map(([value, key]) => {
      return <option key={value} value={value}>{key}</option>
    });
    fullLabel = `Обрати ${label}`
  } else if (isFetching) {
    fullLabel = `Завантаження (${label}) ...`;
  } else if (error) {
    fullLabel = `Помилка завантаження (${label})`;
  }

  const renderedScaleSelect = <select id={id} defaultValue={value} onChange={onChange} className="form-select" disabled={disabled}>
    <option value="">{`--- ${fullLabel} ---`}</option>
    {options}
  </select>

  return (
    <div className="mb-3">{renderedScaleSelect}</div>
  );
}
