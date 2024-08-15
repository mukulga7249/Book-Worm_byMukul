import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { BookCart } from '../../Types/BookCart';

interface CartContextType {
  cartItems: BookCart[];
  fetchData: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<BookCart[]>([]);

  const fetchData = async () => {
    try {
      const userId = "65e0a4b79392f64357d630d6";
      const cartResponse = await axios.get(`http://localhost:5001/api/cart/${userId}`);
      const cartData = cartResponse.data;

      const bookIds = cartData.map((cartItem: any) => cartItem.book_id);
      const bookResponses = await Promise.all(bookIds.map((bookId: string) =>
        axios.get(`http://localhost:5001/api/getBookById/${bookId}`)
      ));

      const updatedCartItems = cartData.map((cartItem: any, index: number) => ({
        ...cartItem,
        ...bookResponses[index].data
      }));

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, fetchData }}>
      {children}
    </CartContext.Provider>
  );
};
