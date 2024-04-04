import { createSlice } from "@reduxjs/toolkit";
import { listingInterface } from "../../types";

interface UserState {
  houses: listingInterface[];
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  houses: [],
  error: null,
  loading: false,
};

const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    getHouseStart: (state) => {
      state.loading = true;
    },
    getHouseSuccess: (state, action: { payload: listingInterface[] }) => {
      state.houses = action.payload;
      state.loading = false;
      state.error = null;
    },
    getHouseFailure: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getHouseStart, getHouseSuccess, getHouseFailure } =
  houseSlice.actions;

export default houseSlice.reducer;
