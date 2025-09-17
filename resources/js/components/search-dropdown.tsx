import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { SearchProduct, SearchCategory } from '@/types';

interface SearchDropdownProps {
  isOpen: boolean;
  products: SearchProduct[];
  categories: SearchCategory[];
  isLoading: boolean;
  onClose: () => void;
  searchTerm: string;
}

export function SearchDropdown({ isOpen, products, categories, isLoading, onClose, searchTerm }: SearchDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#232323]  rounded-lg shadow-lg z-50 max-h-128 overflow-hidden" role="listbox" aria-label="Search results">
      {isLoading ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto"></div>
          <p className="mt-2 text-sm">Searching...</p>
        </div>
      ) : (categories.length > 0 || products.length > 0) ? (
        <div className="flex flex-col lg:flex-row">
          {/* Categories Section - Full width on mobile/tablet, left column on large screens */}
          {categories.length > 0 && (
            <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-[#232323] bg-gray-50 dark:bg-[#18181b]">
              <div className="p-3 border-b border-gray-200 dark:border-[#232323]">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categories
                </h3>
              </div>
              <div className="max-h-32 lg:max-h-80 overflow-y-auto">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.url}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm text-gray-900 dark:text-white truncate">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {category.products_count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products Section - Full width on mobile/tablet, right column on large screens */}
          <div className={`w-full ${categories.length > 0 ? 'lg:flex-1' : ''}`}>
            {products.length > 0 ? (
              <>
                <div className="p-3 border-b border-gray-200 dark:border-[#232323] ">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Products
                  </h3>
                </div>
                <div className="max-h-60 lg:max-h-80 overflow-y-auto">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={product.url}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-[#232323] transition-colors"
                    >
                      <div className="w-10 h-10 flex-shrink-0 bg-gray-100 dark:bg-[#18181b] rounded-lg overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Search className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {product.category}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {product.price} zł
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                {products.length === 8 && (
                  <div className="mr-8 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:bg-[#18181b] bg-gray-50 dark:bg-[#18181b]">
                    <div className="flex items-center justify-center gap-1">
                      <span>Top 8 results • Press Enter for more</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </>
            ) : categories.length > 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No products found</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : searchTerm.length >= 2 ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No results found for "{searchTerm}"</p>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Type at least 2 characters to search</p>
        </div>
      )}
    </div>
  );
}
