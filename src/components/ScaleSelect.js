import {useFetchSettingsQuery} from "../store";

export default function ScaleSelect({value, onChange, disabled}) {
  const {data: settings, isFetching, error} = useFetchSettingsQuery();

  let scaleOptions;
  let label;

  if (settings) {
    scaleOptions = Object.entries(settings.data[0].TASK_SCALES).map(([value, key]) => {
      return <option key={value} value={value}>{key}</option>
    });
    label = 'Обрати масштаб'
  } else if (isFetching) {
    label = 'Завантаження масштабів...';
  } else if (error) {
    label = 'Помилка завантаження';
  }

  const renderedScaleSelect = <select id="scale" defaultValue={value} onChange={onChange} className="form-select" disabled={disabled}>
    <option value="">{`--- ${label} ---`}</option>
    {scaleOptions}
  </select>


  return (
    <div className="mb-3">{renderedScaleSelect}</div>
  );
}