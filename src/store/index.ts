import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./configureStore";
import counterReducer from "../store/counter";
import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const persistConfig: any = {
  key: "root",
  version: 2,
  storage: AsyncStorage,
};

const reducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  counter: counterReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
