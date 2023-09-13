import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import RenderButton from "../buttons/Button";

const showEditIcons = (isLog, isAuthor, isAdmin) => {
  if ((!isLog && isAuthor) || (!isLog && isAdmin)) {
    return (
      <div style={{display: "block", position: "absolute", top: 0, right: "4%"}}>
        <RenderButton style={{padding: "3px 10px"}} button="edit"/>
        <RenderButton style={{padding: "3px 10px"}} button="delete"/>
      </div>
    )
  }
}

export default function Comment({comment}) {
  const authUser = useSelector((state) => state.auth.data);
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
          {showEditIcons(comment.is_log, authUser.id === comment.user.id, authUser.is_admin)}
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