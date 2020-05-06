import actionTypes from "./../constants/index";
import { toast } from "react-toastify";
import axios from "axios";
import server from "./../../config/server";

const updateProfile = (userDetails) => async (dispatch) => {
  try {
    const updatedUser = await axios.put(
      `http://${server.domain}:${server.port}/user`,
      userDetails
    );
    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        user: updatedUser.data,
      },
    });
    toast.success("Account details updated!");
  } catch (err) {
    toast.error(err.message);
  }
};

export { updateProfile };
