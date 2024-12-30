import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import taskSlice from "./task.slice";

export default combineReducers({
  auth: authSlice,
	task: taskSlice
});