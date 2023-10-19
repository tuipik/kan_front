import './task.css';
import RadioGroup from "../custom/radioGroup/RadioGroup";
import {useState} from "react";
import Checkbox from "../custom/checkbox/Checkbox";

export default function TaskSievePanel({ queryParams, changeQueryParams }) {

  const DEFAULT_ORDER_PARAM = 'id';

  const [sortBy, setSortBy] = useState(false);
  const [orderParam, setOrderParam] = useState(DEFAULT_ORDER_PARAM);

  const getOrderPrefix = (orderParam, sortBy) => {
    const prefix = sortBy ? '' : '-';
    return `${prefix}${orderParam}`;
  }

  const handleRadioClick = (event) => {
    const eventValue = event.target.value;
    if (orderParam !== eventValue) {
      setOrderParam(eventValue);
      changeQueryParams({...queryParams, order: getOrderPrefix(eventValue, sortBy)});
    } else {
      setOrderParam(DEFAULT_ORDER_PARAM);
      changeQueryParams({ ...queryParams, order: getOrderPrefix(DEFAULT_ORDER_PARAM, sortBy)})
    }
  }

  const handleCheckboxClick = () => {
    changeQueryParams({...queryParams, order: getOrderPrefix(orderParam, !sortBy)});
    setSortBy(!sortBy);
  }

  return (
    <div className="task-panel">
      <RadioGroup
        value={orderParam}
        setValue={handleRadioClick}
        label={<b>Сортування</b>}
        options={[{value: 'category', label: 'категорія'}, {value: 'name', label: 'номенклатура'} ]}
        inline={true}
      />
      <Checkbox
        value={sortBy}
        onChange={handleCheckboxClick}
        label="На зростання/спад "
        id="sortBy"
      />
    </div>
  )
}