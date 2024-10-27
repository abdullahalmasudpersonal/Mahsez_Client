import React, { createContext, useState } from 'react';
import UseProducts from '../Hooks/UseProducts/UseProducts';
import UseCart from '../Hooks/UseCarts/UseCart';
import { toast } from 'react-toastify';
import { removeFromDb } from '../utilities/fakedb';


export const Context = createContext('');

const AppContext = ({ children }) => {
  const [products, setProducts] = UseProducts([]);
  const [cart, setCart] = UseCart([]);
  const [count, setCount] = useState(1);
  const [searchValuse, setSearchValue] = useState('');


  const addToDb = _id => {
    let shoppingCart = {};
    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
      shoppingCart = JSON.parse(storedCart);
    }
    // add quantity
    const quantity = shoppingCart[_id];
    if (quantity) {
      const newQuantity = quantity + count;
      shoppingCart[_id] = newQuantity;
    }
    else {
      shoppingCart[_id] = count;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
  };

  /* handle shopping cart quantity */
  const decrement = () => {
    setCount((prevState) => {
        if (prevState === 1) return 1;
        return prevState - 1;
    });
};
const increment = () => {
    setCount((prevState) => {
        if (prevState === 10) return 10;
        return prevState + 1;
    });
};


  const handleAddToCard = (selectedAttar) => {
    let newCart = [];
    const exists = cart.find(attar => attar._id === selectedAttar._id);
    if (!exists) {
      selectedAttar.quantity = count;
      newCart = [...cart, selectedAttar];
      toast.success(`Added To Cart ${count}`);
    }
    else {
      const rest = cart.filter(attar => attar._id !== selectedAttar._id);
      /* exists.quantity = exists.quantity + count; */
      newCart = [...rest, exists];
      toast.success(`Added To Cart ${count}`);
    }
    setCart(newCart);
    addToDb(selectedAttar._id);
  };

  /* Cart Product Remove */
  const handleRemoveProduct = product => {
    const rest = cart.filter(pd => pd._id !== product._id);
    setCart(rest);
    removeFromDb(product._id);
  };

  const handleAddMoultipleToCard = (selectedAttar) => {
    let newCart = [];
    const exists = cart.find(attar => attar._id === selectedAttar._id);
    if (!exists) {
      selectedAttar.quantity = count;
      newCart = [...cart, selectedAttar];
      toast.success(`Added To Cart ${count}`);
    }
    else {
      const rest = cart.filter(attar => attar._id !== selectedAttar._id);
      /* exists.quantity = exists.quantity + count; */
      newCart = [...rest, exists];
      toast.warning(`Alrady Added To Cart`);
    }
    setCart(newCart);
    addToDb(selectedAttar._id);
  };

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        count, 
        setCount,
        searchValuse,
        handleAddToCard,
        setSearchValue,
        handleRemoveProduct,
        handleAddMoultipleToCard,
        increment,
        decrement
      }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;