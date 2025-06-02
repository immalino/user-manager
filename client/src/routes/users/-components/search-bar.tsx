import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchBar = ({
  onSearchChange,
  searchTerm,
}: {
  onSearchChange: (term: string) => void;
  searchTerm: string;
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setInputValue(term);
    onSearchChange(term);
  };
  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
          placeholder="Search users by name..."
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};
export default SearchBar;
