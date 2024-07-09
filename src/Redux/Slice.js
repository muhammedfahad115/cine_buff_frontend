import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      console.log(state.token, " : token from redux");
    }
  },
});
export const { setToken } = slice.actions;
export default slice.reducer;
