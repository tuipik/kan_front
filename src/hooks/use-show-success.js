import { useCallback } from "react";
import { showToast } from "../store";
import { useDispatch } from "react-redux";

export default function useShowSuccess(result) {
  const dispatch = useDispatch();

  const showSuccess = useCallback((arg) => {
    const header = arg.header;
    const renderedBody = arg.body;
    dispatch(showToast({header: header, body: renderedBody, bg: 'info'}));
  }, [result, dispatch]);
  
  return showSuccess;
}