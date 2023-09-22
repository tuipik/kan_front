import {useState} from "react";

export default function useRerender()  {
  const [key, setKey] = useState(1);
  const rerender = () => setKey(key+1);
  return [key, rerender];
}