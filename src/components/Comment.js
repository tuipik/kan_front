import {Card} from "react-bootstrap";

export default function Comment({comment}) {
  const size = comment.is_log ? 11 : 16;
  const muted = comment.is_log ? 'muted' : 'dark';
  const opacity = comment.is_log ? .6 : 1;
  return (
    <Card className="mt-2" text={muted} style={{opacity: opacity}}>
      <Card.Header style={{fontSize: 11}}><b>{comment.user.username}</b> <i>{comment.created}</i></Card.Header>
      <Card.Body>
        <Card.Text style={{fontSize: size, whiteSpace: 'pre-wrap'}}>
          {comment.body}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
