import { combineReducers } from "redux";
import auth from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import adminReducer from "./adminReducer";
import poolReducer from "./poolReducer";
import storeReducer from "./storeReducer";

const rootReducer = combineReducers({
  firebaseReducer,
  auth,
  adminReducer,
  poolReducer,
  storeReducer
});
export default rootReducer;
