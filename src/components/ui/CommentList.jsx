import { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { db } from "../../firebase"; 
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!postId) return;

    // Reference Firestore subcollection
    const commentsCollection = collection(db, `posts/${postId}/comments`);
    const q = query(commentsCollection, orderBy("createdAt", "asc"));

    // Listen for changes in Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate
          ? doc.data().createdAt.toDate()
          : new Date(), // Convert Firestore timestamp
      }));
      setComments(commentsData);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [postId]);

  return (
    <div className="mt-4 pl-4 border-l-2 border-purple-700">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={postId} />
        ))
      ) : (
        <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}