import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Imageboard!</h1>
      <div className="space-y-4">
        <Link to="/imageboard/random" className="text-xl underline hover:text-purple-300">
          Random Board
        </Link>
        <Link to="/imageboard/tech" className="text-xl underline hover:text-purple-300">
          Tech Board
        </Link>
        <Link to="/imageboard/games" className="text-xl underline hover:text-purple-300">
          Games Board
        </Link>
      </div>
    </div>
  );
}