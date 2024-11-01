// Define the type for the shopping cart
interface ShoppingCart {
  [key: string]: number;
}

// Function to add item to the cart in local storage
const addToDb = (_id: string): void => {
  let shoppingCart: ShoppingCart = {};

  // Get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  // Add quantity
  const quantity = shoppingCart[_id];
  if (quantity) {
    const newQuantity = quantity + 1;
    shoppingCart[_id] = newQuantity;
  } else {
    shoppingCart[_id] = 1;
  }

  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

// Function to decrease quantity or delete item from the cart in local storage
const deleteToDb = (_id: string): void => {
  let shoppingCart: ShoppingCart = {};

  // Get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  // Decrease quantity
  const quantity = shoppingCart[_id];
  if (quantity) {
    const newQuantity = quantity - 1;
    if (newQuantity > 0) {
      shoppingCart[_id] = newQuantity;
    } else {
      delete shoppingCart[_id];
    }
  }

  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

// Function to get the stored cart from local storage
const getStoredCart = (): ShoppingCart => {
  let shoppingCart: ShoppingCart = {};

  // Get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  return shoppingCart;
};

// Function to remove an item from the cart in local storage
const removeFromDb = (_id: string): void => {
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    const shoppingCart: ShoppingCart = JSON.parse(storedCart);
    if (_id in shoppingCart) {
      delete shoppingCart[_id];
      localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }
  }
};

// Function to delete the entire shopping cart from local storage
const deleteShoppingCart = (): void => {
  localStorage.removeItem("shopping-cart");
};

export { addToDb, deleteToDb, getStoredCart, removeFromDb, deleteShoppingCart };

// interface ShoppingCart {
//   [key: string]: number;
// }

// // use local storage to manage cart data
// const addToDb = (_id: string) => {
//   let shoppingCart: ShoppingCart = {};

//   //get the shopping cart from local storage
//   const storedCart = localStorage.getItem("shopping-cart");
//   if (storedCart) {
//     shoppingCart = JSON.parse(storedCart);
//   }

//   // add quantity
//   const quantity = shoppingCart[_id];
//   if (quantity) {
//     const newQuantity = quantity + 1;
//     shoppingCart[_id] = newQuantity;
//   } else {
//     shoppingCart[_id] = 1;
//   }
//   localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
// };

// const deleteToDb = (_id: string) => {
//   let shoppingCart = {};

//   //delete the shopping cart from local storage
//   const storedCart = localStorage.getItem("shopping-cart");
//   if (storedCart) {
//     shoppingCart = JSON.parse(storedCart);
//   }

//   // Decrease  quantity
//   const quantity = shoppingCart[_id];
//   if (quantity) {
//     const deleteQuantity = quantity - 1;
//     shoppingCart[_id] = deleteQuantity;
//   }

//   localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
// };

// const getStoredCart = () => {
//   let shoppingCart = {};

//   //get the shopping cart from local storage
//   const storedCart = localStorage.getItem("shopping-cart");
//   if (storedCart) {
//     shoppingCart = JSON.parse(storedCart);
//   }
//   return shoppingCart;
// };

// const removeFromDb = (_id: string) => {
//   const storedCart = localStorage.getItem("shopping-cart");
//   if (storedCart) {
//     const shoppingCart = JSON.parse(storedCart);
//     if (_id in shoppingCart) {
//       delete shoppingCart[_id];
//       localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
//     }
//   }
// };

// const deleteShoppingCart = () => {
//   localStorage.removeItem("shopping-cart");
// };

// export { addToDb, deleteToDb, getStoredCart, removeFromDb, deleteShoppingCart };
