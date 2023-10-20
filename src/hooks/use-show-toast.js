import { useCallback } from "react";
import { showToast } from "../store";
import { useDispatch } from "react-redux";

export default function useShowToast(result) {
  const dispatch = useDispatch();

  const showMyToast = useCallback((arg) => {
    const header = arg.header;
    const renderedBody = arg.body;
    const bg = arg.bg;
    dispatch(showToast({header: header, body: renderedBody, bg}));
  }, [result, dispatch]);
  
  return showMyToast;
}