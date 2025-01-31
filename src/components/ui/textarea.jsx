export function Textarea({ value, onChange, placeholder }) {
    return (
      <textarea
        className="w-full p-2 rounded-lg bg-purple-700 text-white resize-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
      />
    );
  }