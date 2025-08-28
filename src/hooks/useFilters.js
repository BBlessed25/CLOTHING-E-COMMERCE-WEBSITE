import { useState, useCallback } from 'react';

export function useFilters() {
  const [params, setParams] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const set = useCallback((key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setParams({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  }, []);

  const applyFilters = useCallback((products) => {
    let filtered = [...products];

    // Search filter
    if (params.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(params.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(params.search.toLowerCase())
      );
    }

    // Category filter
    if (params.category) {
      filtered = filtered.filter(product => product.category === params.category);
    }

    // Price filters
    if (params.minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(params.minPrice));
    }
    if (params.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(params.maxPrice));
    }

    // Sorting
    filtered.sort((a, b) => {
      let aVal = a[params.sortBy];
      let bVal = b[params.sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (params.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [params]);

  return {
    params,
    set,
    reset,
    applyFilters
  };
}

