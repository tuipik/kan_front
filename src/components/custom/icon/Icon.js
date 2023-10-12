import {useState} from 'react';
import classNames from 'classnames';
import {AiOutlineEdit} from "react-icons/ai";
import {GoTrash} from "react-icons/go";

export default function Icon({id, className, inputStyle, icon, onChange, onClick, behaveLikeButton, ...inputProps}) {

  const icons = {
    edit: <AiOutlineEdit/>,
    delete: <GoTrash/>
  }

  const [selected, setSelected] = useState(false);

  const handleFocused = () => {
    setSelected(current => !current);
  }

  const inputClasses = classNames(
    'kan_icon',
    className,
  );

  const makeStyle = () => {
    const likeButtonStyle = {
      padding: "3px 10px",
      cursor: "pointer",
      display: "inline-block",
      border: selected ? 'solid 1px' : '',
      borderRadius: selected ? '5px' : ''
    }
    if (behaveLikeButton) {
      return Object.assign(likeButtonStyle, inputStyle)
    }
    return inputStyle
  }

  return (
    <div
      {...inputProps}
      id={id}
      className={inputClasses}
      style={makeStyle()}
      onChange={onChange}
      onClick={onClick}
      onMouseDown={handleFocused}
      onMouseUp={handleFocused}
    >
      {icons[icon]}
    </div>
  );
}
