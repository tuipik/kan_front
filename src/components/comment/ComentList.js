import { useState } from "react";
import { useCreateCommentMutation, useFetchCommentsQuery } from "../../store";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import useShowErrors from "../../hooks/use-show-errors";

export default function CommentList({ task }) {
  
  const {data: comments, error: fetchCommentsError, isFetching} = useFetchCommentsQuery(task.id);
  
  const {data: {id: userId}} = useSelector((state) => {
    return state.auth;
  });

  const showErrors = useShowErrors();
  
  const [body, setBody] = useState('');

  const [doCreateComment, data] = useCreateCommentMutation();

  let renderedComments;

  if (comments && comments.data) {
    renderedComments = comments.data.map((comment) => <Comment key={comment.id} comment={comment} />);
  } else if (isFetching) {
    renderedComments = <div>Завантаження коментарів...</div>;
  } else {
    console.log(fetchCommentsError);
    renderedComments = <div style={{color: 'red'}}>Помилка завантаження коментарів</div>;
  }

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const commentData = {
      user: userId,
      task: task.id,
      body,
    }
    doCreateComment(commentData)
      .unwrap()
      .catch((error) => showErrors(error.data))
    ;
    setBody('');
  };

  return (
    <>
      <br />
      <form className="form-floating" onSubmit={handleFormSubmit}>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="commentTextarea"
          value={body} 
          onChange={handleBodyChange}
        />
        <label htmlFor="commentTextarea">Новий коментар</label>
        <br />
        <button className="btn btn-primary">{data.isLoading ? 'Відправка...' : 'Відправити'}</button>
      </form>
      <br />
      {renderedComments}
    </>
  )
}