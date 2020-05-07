import { combineReducers } from "redux";
import auth from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import adminReducer from "./adminReducer";
import poolReducer from "./poolReducer";
import storeReducer from "./storeReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  firebaseReducer,
  auth,
  adminReducer,
  poolReducer,
  storeReducer,
  orderReducer
});
export default rootReducer;
