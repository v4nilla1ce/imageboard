import { useState } from "react";
import { Card } from "./card";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Comment({ comment, postId }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Format date into a readable string
  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Handle adding a reply to Firestore
  const handleAddReply = async (replyData) => {
    if (!postId || !comment.id) return;

    const repliesCollection = collection(db, `posts/${postId}/comments/${comment.id}/replies`);

    const newReply = {
      text: replyData.text,
      username: replyData.username || "An0n",
      country: replyData.country || "Unknown",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(repliesCollection, newReply);
      setShowReplyForm(false); // Hide the reply form after submitting
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="mr-2">{comment.country || "Unknown"}</span>
          <span className="font-bold mr-2">{comment.username || "Anonymous"}</span>
        </div>
        <span className="text-gray-400 text-sm">
          {comment.createdAt ? formatDate(comment.createdAt) : "Just now"}
        </span>
      </div>
      <p className="text-white mb-2">{comment.text}</p>
      <button
        onClick={() => setShowReplyForm((prev) => !prev)}
        className="text-blue-400 text-sm underline hover:text-blue-300"
      >
        Reply
      </button>

      {/* Show Reply Form */}
      {showReplyForm && (
        <CommentForm postId={postId} onCommentAdded={handleAddReply} />
      )}

      {/* Render only direct replies, no recursive nesting */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-purple-700">
          {comment.replies.map((reply) => (
            <Card key={reply.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="mr-2">{reply.country || "Unknown"}</span>
                  <span className="font-bold mr-2">{reply.username || "Anonymous"}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {reply.createdAt ? formatDate(reply.createdAt) : "Just now"}
                </span>
              </div>
              <p className="text-white">{reply.text}</p>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}