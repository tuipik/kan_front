export default function Comment({ comment }) {
  return (
    <div className="mb-3">
      <span><b>{comment.user.username}</b> <i>{comment.created}</i></span>
      <textarea className="form-control" rows="3" defaultValue={comment.body} />
    </div>
  );
}