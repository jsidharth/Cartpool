import { combineReducers } from "redux";
import auth from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  firebaseReducer,
  auth
});
export default rootReducer;