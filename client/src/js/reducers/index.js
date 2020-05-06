import { combineReducers } from "redux";
import auth from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import adminReducer from "./adminReducer";
import poolReducer from "./poolReducer";

const rootReducer = combineReducers({
  firebaseReducer,
  auth,
  adminReducer,
  poolReducer
});
export default rootReducer;
