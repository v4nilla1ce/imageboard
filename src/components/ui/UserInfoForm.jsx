import { Input } from "./input";

export function UserInfoForm({ username, setUsername, country, setCountry }) {
  return (
    <div className="mb-4">
      <Input
        placeholder="Select a temporary username (optional)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-3 p-2 rounded-lg bg-purple-700 text-white"
      />
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full mb-3 p-2 rounded-lg bg-purple-700 text-white"
      >
        <option value="">Select a country</option>
        <option value="🇺🇸">United States</option>
        <option value="🇬🇧">United Kingdom</option>
        <option value="🇩🇪">Germany</option>
        <option value="🇫🇷">France</option>
        <option value="🇯🇵">Japan</option>
        <option value="🇮🇳">India</option>
      </select>
    </div>
  );
}