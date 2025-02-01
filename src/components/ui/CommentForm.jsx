import { UserInfoForm } from "./UserInfoForm";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { useState } from "react";

export function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      const commentUsername = username.trim() ? username : "An0n";
      onSubmit({ text, username: commentUsername, country, id: Date.now(), replies: [] });
      setText("");
      setUsername("");
      setCountry("");
    }
  };

  return (
    <div className="mt-4">
      <UserInfoForm username={username} setUsername={setUsername} country={country} setCountry={setCountry} />
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