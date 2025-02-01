import { Card } from "./card";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useState } from "react";

export function Comment({ comment, addReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleAddReply = (reply) => {
    addReply(reply);
    setShowReplyForm(false);
  };

  return (
    <Card className="p-4 bg-purple-700 rounded-lg mb-4">
      <div className="flex items-center mb-2">
        <span className="mr-2">{comment.country}</span>
        <span className="font-bold">{comment.username}</span>
      </div>
      <p className="text-white mb-2">{comment.text}</p>
      <button
        onClick={() => setShowReplyForm((prev) => !prev)}
        className="text-blue-400 text-sm underline hover:text-blue-300"
      >
        Reply
      </button>
      {showReplyForm && <CommentForm onSubmit={handleAddReply} />}
      <CommentList comments={comment.replies} />
    </Card>
  );
}