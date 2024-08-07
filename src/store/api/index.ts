import { createSlice } from "@reduxjs/toolkit";
import { pokemonApi } from "../configureStore";

const initialState = {
  value: 1,
  token: "",
  success: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    logout: (state, action) => {
      state.success = false;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.login.matchFulfilled,
      (state: any, response: any) => {
        if (response.payload.success && response.payload.token) {
          state.success = response.payload.success;
          state.token = response.payload.token;
        }
      }
    );
    builder.addMatcher(
      pokemonApi.endpoints.register.matchFulfilled,
      (state: any, response: any) => {
        console.log("asdsadasda", response.payload.success);
        if (response.payload.success && response.payload.token) {
          state.success = response.payload.success;
          state.token = response.payload.token;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, logout } =
  productSlice.actions;

export default productSlice.reducer;
