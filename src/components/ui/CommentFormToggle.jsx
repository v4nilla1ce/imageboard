import { useState } from "react";
import { CommentForm } from "./CommentForm";

export function CommentFormToggle({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <CommentForm
      onSubmit={(data) => {
        onSubmit(data);
        setShowForm(false); // Hide form after submission
      }}
    />
  ) : (
    <button
      onClick={() => setShowForm(true)}
      className="text-blue-400 text-sm underline hover:text-blue-300 mt-2"
    >
      Reply
    </button>
  );
}