import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NavSearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearch?: string;
}

export function NavSearch({ onSearch, initialSearch = '' }: NavSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md w-full mx-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full h-9 pl-10 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#18181b] text-black dark:text-white focus:border-black dark:focus:border-white transition-colors"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}
