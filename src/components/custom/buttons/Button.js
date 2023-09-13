import {AiOutlineEdit} from "react-icons/ai";
import {GoTrash} from "react-icons/go";

export default function RenderButton({style, onClick, button}) {
  const buttons = {
    edit: <AiOutlineEdit/>,
    delete: <GoTrash/>
  }
  return (
      <div className="btn" style={style} onClick={onClick}>
        {buttons[button]}
      </div>
  );
}

