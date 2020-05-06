import { combineReducers } from "redux";
import auth from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  firebaseReducer,
  auth,
  adminReducer
});
export default rootReducer;
