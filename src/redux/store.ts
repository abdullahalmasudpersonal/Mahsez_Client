import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./features/counter/counterSlice";
import shoppingCartResucer from "./features/shoppingCart/shoppingCartSlice";

const parsistConfig = {
  key: "auth",
  storage,
};

const shoppingPersistConfig = {
  key: "shoppingCart",
  storage,
};

const parsistedAuthReducer = persistReducer(parsistConfig, authReducer);
const persistedShoppingCartReducer = persistReducer(
  shoppingPersistConfig,
  shoppingCartResucer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: parsistedAuthReducer,
    counter: counterReducer,
    shopping: persistedShoppingCartReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
