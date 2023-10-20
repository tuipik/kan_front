export default function Select(
  {
    id,
    value,
    onChange,
    disabled,
    data,
    isFetching,
    error,
    label,
    multiple,
    skipFirstOptionDashes,
    skipChoiceWord,
    firstOption
  }
) {

  const EMPTY_CHOICE_APPENDIX = '---';
  const CHOICE_WORD = 'Обрати ';

  let options;
  let firstOptionLabel = '';

  if (data) {
    options = Object.entries(data).map(([value, key]) => {
      return <option key={value} value={value}>{key}</option>
    });
    firstOptionLabel = !!firstOption ? firstOption : label;
    const appendix = skipFirstOptionDashes ? '' : EMPTY_CHOICE_APPENDIX;
    const choiceWord = skipChoiceWord ? '' : CHOICE_WORD;
    firstOptionLabel = `${appendix}${choiceWord}${firstOptionLabel}${appendix}`;
  } else if (isFetching) {
    firstOptionLabel = `Завантаження (${label}) ...`;
  } else if (error) {
    firstOptionLabel = `Помилка завантаження (${label})`;
  }

  const renderedScaleSelect = <select style={{'height': 'auto'}}
    id={id}
    defaultValue={value}
    onChange={onChange}
    className="form-select mb-3"
    disabled={disabled}
    name={id}
    multiple={multiple}
  >
    <option value="">{firstOptionLabel}</option>
    {options}
  </select>

  return (
    <div className="form-floating">
      {renderedScaleSelect}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
