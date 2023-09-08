export default function Select(
  {
    id,
    value,
    onChange,
    disabled,
    data,
    isFetching,
    error,
    defaultLabel
  }
) {

  let options;
  let label = defaultLabel;

  if (data) {
    options = Object.entries(data).map(([value, key]) => {
      return <option key={value} value={value}>{key}</option>
    });
    label = 'Обрати масштаб'
  } else if (isFetching) {
    label = 'Завантаження ...';
  } else if (error) {
    label = 'Помилка завантаження';
  }

  const renderedScaleSelect = <select id={id} defaultValue={value} onChange={onChange} className="form-select" disabled={disabled}>
    <option value="">{`--- ${label} ---`}</option>
    {options}
  </select>

  return (
    <div className="mb-3">{renderedScaleSelect}</div>
  );
}
