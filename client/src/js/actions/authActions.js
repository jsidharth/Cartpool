import actionTypes from "./../constants/index";
import firebase from "../../config/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import server from "./../../config/server";

const signUp = (userDetails, ownProps) => async dispatch => {
  try {
    const { email, password, ...details } = userDetails;
    // Sign Up user
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const idToken = await firebase.auth().currentUser.getIdToken();
    const serializedidToken = JSON.stringify(idToken);
    localStorage.setItem("idToken", serializedidToken);
    const userPayload = {
      email,
      screenName: `${details.firstName} ${details.lastName}`,
      nickName: details.nickName
    };
    await axios.post(
      `http://${server.domain}:${server.port}/user`,
      userPayload
    );
    ownProps.history.push("/signin");
    toast.success("Signup Sucess! Please verfiy your email!");
  } catch (err) {
    if(err && err.response) {
      toast.error(err.response.data);
    } else {
      toast.error("Can't place order");
    }
  }
};

const signIn = (payload, ownProps) => async dispatch => {
  try {
    const { email, password } = payload;
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const idToken = await firebase.auth().currentUser.getIdToken();
    const serializedidToken = JSON.stringify(idToken);
    localStorage.setItem("idToken", serializedidToken);
    //TODO: Change endpoint to user detail API
    const user = await axios.get(`http://${server.domain}:${server.port}/user`);
    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        user: user.data
      }
    });
    const { role } = user.data;
    if (role === "USER") {
      ownProps.history.push("/browse/stores");
    } else {
      ownProps.history.push("/admin/stores");
    }
  } catch (err) {
    if(err && err.response) {
      toast.error(err.response.data);
    } else {
      toast.error("Can't place order");
    }
  }
};

const signOut = (ownProps) => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    localStorage.removeItem("idToken");
    localStorage.removeItem("state");
    dispatch({
      type: actionTypes.CLEAR_USER,
      payload: {}
    });
    ownProps.history.push("/");
  } catch (err) {
    toast.error(err.response.data);
  }
};
//TODO: Check if we can remove this
const googleSignUp = ownProps => async dispatch => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
      payload: {
        signup: true
      }
    });
    ownProps.history.push("/signin");
  } catch (err) {
    toast.error("Google signup failed!");
  }
};

const googleSignIn = ownProps => async dispatch => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const signedInUser = await firebase.auth().signInWithPopup(provider);
    console.log(signedInUser);
    dispatch({
      type: actionTypes.SIGNIN_SUCCESS,
      payload: {
        user: signedInUser
      }
    });
    ownProps.history.push("/home");
  } catch (err) {
    toast.error("Google signup failed!");
  }
};

export { signIn, signUp, googleSignIn, googleSignUp, signOut };
