import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice";

// store for auth token in redux store //
export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
