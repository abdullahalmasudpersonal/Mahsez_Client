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
    //     addProduct: (state, action: PayloadAction<Product>) => {
    //       const existingProduct = state.cart.find(
    //         (product) => product._id === action.payload._id
    //       );
    //       if (existingProduct) {
    //         existingProduct.quantity = Math.min(
    //           existingProduct.quantity + action.payload.quantity,
    //           existingProduct.availableQuantity,
    //           10
    //         );
    //       } else {
    //         state.cart.push(action.payload);
    //       }
    //     },
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
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;

// // features/shopping/shoppingSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Product {
//   _id: string;
//   quantity: number;
//   availableQuantity: number;
// }
// // interface Product {
// //   id: string;
// //   name: string;
// //   price: number;
// //   quantity: number;
// //   availableQuantity: number;
// // }

// interface ShoppingState {
//   cart: Product[];
// }

// const initialState: ShoppingState = {
//   cart: [],
// };

// // features/shopping/shoppingSlice.ts
// const shoppingSlice = createSlice({
//   name: "shopping",
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<Product>) => {
//       const existingProduct = state.cart.find(
//         (product) => product._id === action.payload._id
//       );
//       if (existingProduct) {
//         existingProduct.quantity = Math.min(
//           existingProduct.quantity + action.payload.quantity,
//           existingProduct.availableQuantity,
//           10
//         );
//       } else {
//         state.cart.push(action.payload);
//       }
//     },
//     incrementQuantity: (state, action: PayloadAction<string>) => {
//       const product = state.cart.find(
//         (product) => product._id === action.payload
//       );
//       if (product && product.quantity < product.availableQuantity) {
//         product.quantity = Math.min(
//           product.quantity + 1,
//           product.availableQuantity,
//           10
//         );
//       }
//     },
//     decrementQuantity: (state, action: PayloadAction<string>) => {
//       const product = state.cart.find(
//         (product) => product._id === action.payload
//       );
//       if (product) {
//         product.quantity = Math.max(product.quantity - 1, 1);
//       }
//     },
//     removeProduct: (state, action: PayloadAction<string>) => {
//       state.cart = state.cart.filter(
//         (product) => product._id !== action.payload
//       );
//     },
//   },
// });

// export const {
//   addProduct,
//   removeProduct,
//   incrementQuantity,
//   decrementQuantity,
// } = shoppingSlice.actions;

// export default shoppingSlice.reducer;
