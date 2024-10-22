import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "./../../config/firebase";
import axios from "axios";
import { loadState, saveState } from "./../../persistState";

const persistedState = loadState();

axios.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("idToken")) {
      const idToken = localStorage.getItem("idToken");

      if (idToken) {
        config.headers.Authorization = JSON.parse(idToken);
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use((response) => {
//     return response;
// },
// function (error) {
// if (error.response.status === 401) {

//     toast.error('Unauthorized!');
// } else if(error.response.status === 500) {
//     const msg = error.response.data.message ? error.response.data.message : 'Oops! Something went wrong!';
//     toast.error(msg);
// }
// return Promise.reject(error);
// });

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
  createStore
);

const store = createStoreWithFirebase(
  rootReducer,
  persistedState,
  storeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export default store;
