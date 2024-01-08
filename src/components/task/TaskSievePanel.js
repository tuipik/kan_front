import './task.css';
import RadioGroup from "../custom/radioGroup/RadioGroup";
import {useState} from "react";
import CheckboxGroup from "../custom/checkboxGroup/CheckboxGroup";
import Checkbox from "../custom/checkbox/Checkbox";
import {useSelector} from "react-redux";
import {useFetchDepartmentsQuery} from "../../store";
import Select from "../custom/select/Select";
import useSettings from "../../hooks/use-settings";

export default function TaskSievePanel({ queryParams, changeQueryParams }) {

  const DEFAULT_ORDER_PARAM = 'id';

  const [sortBy, setSortBy] = useState(false);
  const [orderParam, setOrderParam] = useState(DEFAULT_ORDER_PARAM);

  const [quarters, setQuarters] = useState(new Set(['1', '2', '3', '4']));
  const [scales, setScales] = useState(null);
  const [onlyMyTasks, setOnlyMyTask] = useState(false);

  const {data: currentUser} = useSelector(state =>  state.auth);

  const {data: departments, error: departmentsErrors, isFetching: isDepartmentsFetching} = useFetchDepartmentsQuery();
  const [department, setDepartment] = useState(null);

  const [year, setYear] = useState(queryParams.year);

  const {settings, isFetchingSettings, settingsError} = useSettings();

  const getOrderPrefix = (orderParam, sortBy) => {
    const prefix = sortBy ? '' : '-';
    return `${prefix}${orderParam}`;
  }

  const handleOrderParamClick = (event) => {
    const eventValue = event.target.value;
    if (orderParam !== eventValue) {
      setOrderParam(eventValue);
      changeQueryParams({...queryParams, ordering: getOrderPrefix(eventValue, sortBy)});
    } else {
      setOrderParam(DEFAULT_ORDER_PARAM);
      changeQueryParams({ ...queryParams, ordering: getOrderPrefix(DEFAULT_ORDER_PARAM, sortBy)})
    }
  }

  const handleSortByClick = () => {
    changeQueryParams({...queryParams, ordering: getOrderPrefix(orderParam, !sortBy)});
    setSortBy(!sortBy);
  }

  const handleQuarterCLick = (event) => {
    const eventValue = event.target.value;
    const updatedQuarters = new Set(quarters);
    if (updatedQuarters.has(eventValue)){
      updatedQuarters.delete(eventValue);
    } else {
      updatedQuarters.add(eventValue);
    }
    setQuarters(updatedQuarters);
    let quarterParam = Array.from(updatedQuarters).toString() || -1;
    changeQueryParams({...queryParams, quarter__in: quarterParam});
  }

  const handleMyTasksClick = (event) => {
    const checked = event.target.checked;
    setOnlyMyTask(checked);
    if (checked) {
      changeQueryParams({...queryParams, user__id: currentUser.id});
    } else {
      const updatedQueryParams = {...queryParams};
      delete updatedQueryParams.user__id;
      changeQueryParams(updatedQueryParams);
    }
  };

  const handleSelectChange = (event, setValue, queryParamsKey) => {
    const eventValue = event.target.value;
    setValue(eventValue);

    let updatedQueryParams = {...queryParams};
    if (eventValue === null) {
      delete updatedQueryParams[queryParamsKey];
    } else {
      updatedQueryParams = {...updatedQueryParams, [queryParamsKey]: eventValue}
    }
    changeQueryParams(updatedQueryParams);
  };

  const handleDepartmentChange = (event) => {
    handleSelectChange(event, setDepartment, 'department__id');
  };

  const handleYearChange = (event) => {
    handleSelectChange(event, setYear, 'year');
  };

  const handleScaleChange = (event) => {
    handleSelectChange(event, setScales, 'scale');
  };

  return (
    <div className="task-panel">
      <div className="row">
        <div className="col-2">
          <div>
            <RadioGroup
              value={orderParam}
              setValue={handleOrderParamClick}
              label={<b>Сортування</b>}
              options={[{value: 'category', label: 'категорія'}, {value: 'name', label: 'номенклатура'} ]}
              inline={true}
            />
            <Checkbox
              value={sortBy}
              onChange={handleSortByClick}
              label="На зростання/спад "
              id="sortBy"
            />
          </div>
        </div>
        <div className="col-3">
          <div><b>Фільтрування:</b></div>
          <CheckboxGroup
            values={quarters}
            label='Квартал:  '
            setValue={handleQuarterCLick}
            options={[
              {value: '1', label: 'перший'},
              {value: '2', label: 'другий'},
              {value: '3', label: 'третій'},
              {value: '4', label: 'четвертий'},
            ]}
            inline={true}
          />
          { !currentUser.is_admin && <Checkbox
            value={onlyMyTasks}
            onChange={handleMyTasksClick}
            label="Мої задачі"
            id="onlyMyTasks"
          />}
        </div>
        {currentUser.is_admin && <div className="col-2">
          <Select
            id="department"
            value={department}
            onChange={handleDepartmentChange}
            data={departments?.data ?
              departments.data.reduce(
                (obj, department) => (obj[department.id] = department.name, obj), {}
              ) : null}
            isFetching={isDepartmentsFetching}
            label="відділ"
            firstOption="всі відділи"
            error={departmentsErrors}
            skipFirstOptionDashes={true}
            skipChoiceWord={true}
          />
        </div>}
        <div className="col-2">
          {settings?.POSSIBLE_TASK_YEARS && <Select
            id="year"
            value={year}
            onChange={handleYearChange}
            data={settings.POSSIBLE_TASK_YEARS.reduce(
              (obj, year) => (obj[year] = year, obj), {}
            )}
            isFetching={isFetchingSettings}
            label="рік"
            firstOption="всі роки"
            error={settingsError}
            skipFirstOptionDashes={true}
            skipChoiceWord={true}
          />}
        </div>
        <div className="col-2">
          {settings?.TASK_SCALES && <Select
            id="scales"
            value={scales}
            onChange={handleScaleChange}
            data={settings.TASK_SCALES}
            isFetching={isFetchingSettings}
            label="масштаб"
            firstOption="всі масштаби"
            error={settingsError}
            skipFirstOptionDashes={true}
            skipChoiceWord={true}
          />}
        </div>
      </div>
    </div>
  )
}