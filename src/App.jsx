import { useState } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { UserInfoForm } from "./components/ui/UserInfoForm";
import { CommentList } from "./components/ui/CommentList";
import { CommentFormToggle } from "./components/ui/CommentFormToggle";

export default function Imageboard() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");

  const handlePost = () => {
    if (text || image) {
      const postUsername = username.trim() ? username : "An0n";
      setPosts([{ text, image, username: postUsername, country, id: Date.now(), comments: [] }, ...posts]);
      setText("");
      setImage(null);
      setUsername("");
      setCountry("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Post Form */}
        <Card className="p-4 bg-purple-800 rounded-2xl shadow-md">
          <UserInfoForm
            username={username}
            setUsername={setUsername}
            country={country}
            setCountry={setCountry}
          />
          <Textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full mb-3 p-2 rounded-lg bg-purple-700 text-white"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="upload"
          />
          <label htmlFor="upload" className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
            <Upload size={20} /> Upload Image
          </label>
          {image && <img src={image} alt="Preview" className="mt-3 rounded-lg max-h-40" />}
          <Button onClick={handlePost} className="w-full mt-4 bg-purple-600 hover:bg-purple-500">Post</Button>
        </Card>

        {/* Post List */}
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="p-4 bg-purple-800 rounded-2xl shadow-md">
                {/* Post Content */}
                <div className="flex items-center mb-2">
                  <span className="mr-2">{post.country}</span>
                  <span className="font-bold">{post.username}</span>
                </div>
                {post.text && <p className="mb-2 text-white">{post.text}</p>}
                {post.image && <img src={post.image} alt="Post" className="rounded-lg max-h-60" />}

                {/* Comments */}
                <CommentList
                  comments={post.comments}
                  addReply={(commentId, reply) => {
                    const updatedComments = post.comments.map((comment) =>
                      comment.id === commentId
                        ? { ...comment, replies: [...comment.replies, reply] }
                        : comment
                    );
                    setPosts((prevPosts) =>
                      prevPosts.map((p) =>
                        p.id === post.id ? { ...p, comments: updatedComments } : p
                      )
                    );
                  }}
                />

                {/* Initial Comment Reply Link */}
                <CommentFormToggle
                  onSubmit={(newComment) => {
                    const updatedPosts = posts.map((p) =>
                      p.id === post.id ? { ...p, comments: [...p.comments, newComment] } : p
                    );
                    setPosts(updatedPosts);
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}