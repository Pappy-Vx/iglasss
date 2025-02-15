import { useState, useEffect } from 'react';
import { ProductCardProps } from '../types/home.types';

const MAX_RECENT_ITEMS = 6;

export const useRecentlyViewed = () => {
  const [recentItems, setRecentItems] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentItems(JSON.parse(stored));
    }
  }, []);

  const addToRecentlyViewed = (product: ProductCardProps) => {
    setRecentItems(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== product.id);
      // Add to beginning of array and limit to MAX_RECENT_ITEMS
      const newItems = [product, ...filtered].slice(0, MAX_RECENT_ITEMS);
      // Store in localStorage
      localStorage.setItem('recentlyViewed', JSON.stringify(newItems));
      return newItems;
    });
  };

  return {
    recentItems,
    addToRecentlyViewed
  };
};
