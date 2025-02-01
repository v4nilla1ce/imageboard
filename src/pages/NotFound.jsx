import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link to="/imageboard/main" className="text-xl underline hover:text-purple-300">
        Go Back to Main Page
      </Link>
    </div>
  );
}