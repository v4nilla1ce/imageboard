import { UserInfoForm } from "./UserInfoForm";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { useState } from "react";
import { db } from "../../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

export function CommentForm({ postId }) {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async () => {
    if (!postId) {
      console.error("Error: No postId provided for comment submission.");
      return;
    }

    if (text.trim()) {
      const commentUsername = username.trim() ? username : "An0n";

      // Create a new comment object
      const newComment = {
        text,
        username: commentUsername,
        country,
        createdAt: serverTimestamp(), // Firestore timestamp
      };

      try {
        // Add the comment to Firestore in a subcollection under the post
        const commentsCollection = collection(db, `posts/${postId}/comments`);
        await addDoc(commentsCollection, newComment);

        // Reset form fields
        setText("");
        setUsername("");
        setCountry("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <div className="mt-4">
      <UserInfoForm 
        username={username} 
        setUsername={setUsername} 
        country={country} 
        setCountry={setCountry} 
      />
      <Textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full mb-3 p-2 rounded-lg bg-purple-700 text-white"
      />
      <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-500">
        Submit
      </Button>
    </div>
  );
}