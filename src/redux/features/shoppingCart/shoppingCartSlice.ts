import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  quantity: number;
}

interface ShoppingCartState {
  cart: Product[];
}

const initialState: ShoppingCartState = {
  cart: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity = Math.min(
          existingProduct.quantity + action.payload.quantity,
          10
        );
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item._id === action.payload);
      if (product && product.quantity < 10) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (product) => product._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  clearCart,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
