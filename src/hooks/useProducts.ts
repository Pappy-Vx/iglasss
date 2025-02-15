import { useState, useEffect } from 'react';
import { ProductCardProps } from '../types/home.types';

export const useProducts = (initialProducts: ProductCardProps[]) => {
  const [products, setProducts] = useState<ProductCardProps[]>(initialProducts);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest'>('newest');
  const [filterBy, setFilterBy] = useState<string>('');

  useEffect(() => {
    let filtered = [...initialProducts];

    // Apply filters
    if (filterBy) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filterBy.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return 0;
      }
    });

    setProducts(filtered);
  }, [initialProducts, sortBy, filterBy]);

  return {
    products,
    sortBy,
    filterBy,
    setSortBy,
    setFilterBy
  };
};
