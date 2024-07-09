import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
