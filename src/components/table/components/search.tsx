import { SearchNormal1 } from "iconsax-react";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  query, 
  onChange, 
  placeholder = "Search...",
  disabled = false 
}) => {
  return (
    <div className={`flex-[0.8] max-w-96 flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg transition-all duration-200 ${
      disabled 
        ? 'bg-gray-50 cursor-not-allowed' 
        : 'bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-primary hover:border-gray-400'
    }`}>
      <SearchNormal1 size="20" color={disabled ? "#9CA3AF" : "#6B7280"} />
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base disabled:cursor-not-allowed"    
      />
    </div>
  );
};

export default SearchBar;