import { motion } from "framer-motion";
import { useCallback, useState } from "react";

interface FilterDropdownProps {
  name: string;
  options: string[];
  onChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  name,
  options,
  onChange,
  value,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || `All ${name}`);

  const handleSelect = useCallback((option: string) => {
    setSelectedOption(option);
    onChange(option === `All ${name}` ? "" : option);
    setIsOpen(false);
  }, [name, onChange]);

  const allOptions = [`All ${name}`, ...options];

  return (
    <div className="relative w-full md:flex-1">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex justify-between items-center px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg transition-all duration-200 ${
          disabled 
            ? 'bg-gray-50 cursor-not-allowed text-gray-400' 
            : 'hover:border-gray-400 focus:ring-2 focus:ring-primary focus:border-primary'
        }`}
      >
        <span className="truncate text-sm md:text-base text-gray-700">
          {selectedOption}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {allOptions.map((option, index) => (
              <motion.button
                key={option}
                type="button"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  selectedOption === option ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'
                } ${index === 0 ? 'rounded-t-lg' : ''} ${index === allOptions.length - 1 ? 'rounded-b-lg' : ''}`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;