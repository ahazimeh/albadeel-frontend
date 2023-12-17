import { createSelector } from "@reduxjs/toolkit";

const selectSlice = (state: any) => state.counter;

export const selectUserStatus = createSelector(
  [selectSlice],
  (state) => state.success
);

export const selectUserToken = createSelector(
  [selectSlice],
  (state) => state.token
);
