import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SearchProduct, SearchCategory } from '@/types';

interface SearchResponse {
  products: SearchProduct[];
  categories: SearchCategory[];
}

export function useSearch(debounceDelay: number = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchProducts = useCallback(async (query: string) => {
    if (query.length < 2) {
      setProducts([]);
      setCategories([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get<SearchResponse>('/api/search/products', {
        params: { q: query }
      });
      setProducts(response.data.products);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Search error:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchProducts(searchTerm);
      } else {
        setProducts([]);
        setIsLoading(false);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceDelay, searchProducts]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setIsOpen(value.length > 0);

    if (value.length >= 2) {
      setIsLoading(true);
    }
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    setProducts([]);
    setCategories([]);
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    searchTerm,
    products,
    categories,
    isLoading,
    isOpen,
    handleSearchChange,
    handleClear,
    handleClose
  };
}
