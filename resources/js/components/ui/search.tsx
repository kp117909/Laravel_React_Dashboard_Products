import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useMemo, useEffect } from 'react';
import { createHandleSearch, handleChange, handleClear } from '@/utils/data-table';

interface SearchProps {
    placeholder?: string;
    className?: string;
    showClearButton?: boolean;
    debounceMs?: number;
    onSearch?: (query: string) => void;
    initialValue?: string;
}

export function Search({
    placeholder = "Search...",
    className = "w-64",
    showClearButton = true,
    debounceMs = 300,
    onSearch,
    initialValue = ""
}: SearchProps) {
    const [searchQuery, setSearchQuery] = useState(initialValue);
    const handleSearch = useMemo(() => createHandleSearch(debounceMs), [debounceMs]);

    // Update search query when initialValue changes (e.g., from URL params)
    useEffect(() => {
        setSearchQuery(initialValue);
    }, [initialValue]);

    const handleInputChange = (value: string) => {
        handleChange(value, setSearchQuery, onSearch, handleSearch);
    };

    const handleClearClick = () => {
        handleClear(setSearchQuery, onSearch, handleSearch);
    };

    return (
        <div className="flex items-center space-x-2">
            <Input
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                className={className}
                type="search"
            />
            {showClearButton && searchQuery && (
                <Button
                    variant="outline"
                    onClick={handleClearClick}
                    className="text-red-600 hover:text-red-700"
                >
                    Clear
                </Button>
            )}
        </div>
    );
}
