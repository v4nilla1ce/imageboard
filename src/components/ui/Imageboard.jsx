import { useEffect, useState } from "react";
import { Card } from "./card"; // Corrected path
import { Button } from "./button"; // Corrected path
import { Textarea } from "./textarea"; // Corrected path
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { CommentList } from "./CommentList"; // Corrected path
import { CommentFormToggle } from "./CommentFormToggle"; // Corrected path
import { db, storage } from "../../firebase"; // Corrected path
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Imageboard() {
  const { boardName } = useParams(); // Get the board name from the URL
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");

  // Collection path for the current board
  const postsCollection = collection(db, `boards/${boardName}/posts`);

  // Format date into a readable format
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

  // Fetch posts from Firestore for the current board
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(postsCollection, orderBy("createdAt", "desc")),
      (snapshot) => {
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt
            ? doc.data().createdAt.toDate()
            : new Date(),
        }));
        setPosts(postsData);
      }
    );
    return () => unsubscribe();
  }, [boardName]);

  // Handle posting text and image
  const handlePost = async () => {
    if (text || image) {
      const postUsername = username.trim() ? username : "An0n";
      const newPost = {
        text,
        image,
        username: postUsername,
        country,
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(postsCollection, newPost);
        setText("");
        setImage(null);
        setUsername("");
        setCountry("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImage(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Welcome to the {boardName.charAt(0).toUpperCase() + boardName.slice(1)} Board
      </h1>

      {/* Post Form */}
      <Card>
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
        <label
          htmlFor="upload"
          className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white"
        >
          <Upload size={20} /> Upload Image
        </label>
        {image && <img src={image} alt="Preview" className="mt-3 rounded-lg max-h-40" />}
        <Button
          onClick={handlePost}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-500"
        >
          Post
        </Button>
      </Card>

      {/* Post List */}
      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="mr-2">{post.country || "Unknown"}</span>
                  <span className="font-bold mr-2">{post.username || "An0n"}</span>
                  <span className="text-gray-400 text-sm">
                    {post.createdAt ? formatDate(post.createdAt) : "Just now"}
                  </span>
                </div>
              </div>
              {post.text && <p className="mb-2 text-white">{post.text}</p>}
              {post.image && (
                <img src={post.image} alt="Post" className="rounded-lg max-h-60" />
              )}
              <CommentList postId={post.id} />
              <CommentFormToggle onSubmit={(newComment) => console.log(newComment)} />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}