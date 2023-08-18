import { useCallback } from "react";
import { showToast } from "../store";
import { useDispatch } from "react-redux";

export default function useShowErrors(errors) {
  const dispatch = useDispatch();

  const showErrors = useCallback((arg) => {
    const header = <h5>Помилка</h5>;
    const renderedBody = <ul>
      {
        arg.errors.map( (error) =>
          <li key={error.detail}>
            {error.attr ? `${error.attr}: ${error.detail}` : error.detail}
          </li>)
      }
    </ul>;
    dispatch(showToast({header, body: renderedBody, bg: 'warning'}));
  }, [errors, dispatch]);
  return showErrors;
}