import { Comment } from "./Comment";

export function CommentList({ comments, addReply }) {
  return (
    <div className="mt-4 pl-4 border-l-2 border-purple-700">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={(reply) => addReply(comment.id, reply)}
        />
      ))}
    </div>
  );
}