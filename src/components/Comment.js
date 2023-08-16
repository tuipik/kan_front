export default function Comment({ comment }) {
  return (
    <div class="mb-3">
      <span><b>{comment.user.username}</b> <i>{comment.created}</i></span>
      <textarea class="form-control" rows="3" defaultValue={comment.body} />
    </div>
  );
}