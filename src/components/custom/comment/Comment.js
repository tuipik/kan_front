import {Card} from "react-bootstrap";
import {AiOutlineEdit} from "react-icons/ai";
import {GoTrash} from "react-icons/go";

const showEditIcons = (isLog) => {
  if (!isLog) {
    return (
      <div style={{display: "block", position: "absolute", top: 0, right: "4%"}}>
        <div className="btn" style={{padding: "3px 10px"}}><AiOutlineEdit /></div>
        <div className="btn" style={{padding: "3px 10px"}}><GoTrash /></div>
      </div>
    )
  }
}

export default function Comment({comment}) {
  const size = comment.is_log ? 11 : 16;
  const muted = comment.is_log ? 'muted' : 'dark';
  const opacity = comment.is_log ? .6 : 1;
  return (
    <Card className="mt-2" text={muted} style={{opacity: opacity}}>
      <Card.Header>
        <div className="d-flex">
        <div className="flex-grow-1" style={{fontSize: 11}}>
          <b>{comment.user.username}</b>
          <i style={{marginLeft: 10}}>{comment.created}</i>
        </div>
          {showEditIcons(comment.is_log)}
      </div>

      </Card.Header>
      <Card.Body>
        <Card.Text style={{fontSize: size, whiteSpace: 'pre-wrap'}}>
          {comment.body}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}