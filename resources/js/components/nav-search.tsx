import { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/use-search';
import { SearchDropdown } from './search-dropdown';

interface NavSearchProps {
  onSearch: (searchTerm: string) => void;
  initialSearch?: string;
}

export function NavSearch({ onSearch, initialSearch = '' }: NavSearchProps) {
  const {
    searchTerm,
    products,
    categories,
    isLoading,
    isOpen,
    handleSearchChange,
    handleClear,
    handleClose
  } = useSearch(300);

  const searchRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  const handleClearClick = () => {
    handleClear();
    onSearch('');
  };

  return (
    <div ref={searchRef} className="relative max-w-md w-full mx-4">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
            aria-label="Search products"
            className="w-full h-9 pl-10 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#18181b] text-black dark:text-white focus:border-black dark:focus:border-white transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearClick}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      <SearchDropdown
        isOpen={isOpen}
        products={products}
        categories={categories}
        isLoading={isLoading}
        onClose={handleClose}
        searchTerm={searchTerm}
      />
    </div>
  );
}
