export function Input({ type = "text", ...props }) {
    return <input type={type} className="p-2 rounded bg-purple-700 text-white" {...props} />;
  }