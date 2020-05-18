import actionTypes from "./../constants/index";
import { toast } from "react-toastify";
import axios from "axios";
import server from "./../../config/server";

const updateProfile = userDetails => async dispatch => {
  try {
    const updatedUser = await axios.put(
      `http://${server.domain}:${server.port}/user`,
      userDetails
    );
    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        user: updatedUser.data
      }
    });
    toast.success("Account details updated!");
  } catch (err) {
    toast.error(err.response.data);
  }
};

const verifyEmail = (userEmail) => async dispatch => {
  try {
    await axios.get(`http://${server.domain}:${server.port}/user/verify?userEmail=${userEmail}`);
    dispatch(getDetails());
  } catch (err) {
    toast.error(err.response.data);
  }
}

const verifyPool = (poolMemberId) => async dispatch => {
  try {
    await axios.get(`http://${server.domain}:${server.port}/pool/approve?poolMemberId=${poolMemberId}`)
  } catch (err) {
    toast.error(err.response.data);
  }
}

const getDetails = () => async dispatch => {
  try {
    const user = await axios.get(`http://${server.domain}:${server.port}/user`);
    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        user: user.data
      }
    });

  } catch(err) {
    toast.error(err.response.data);
  }
}
export { updateProfile, verifyEmail, verifyPool, getDetails};
