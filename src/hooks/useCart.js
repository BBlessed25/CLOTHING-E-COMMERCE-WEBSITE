import { useState, useCallback } from 'react';

export function useCart() {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const currency = 'USD';

  return {
    items,
    isOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    subtotal,
    currency
  };
}

