export function Button({ children, onClick }) {
    return (
      <button
        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }