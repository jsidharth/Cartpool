import { toast } from "react-toastify";
import axios from "axios";
import server from "./../../config/server";
import actionTypes from "../constants";

const getStores = () => async dispatch => {
  try {
    const stores = await axios.get(
      `http://${server.domain}:${server.port}/stores`
    );
    dispatch({
      type: actionTypes.SET_STORES,
      payload: {
        stores: stores.data
      }
    });
  } catch (err) {
    toast.error(err.response.data);
  }
};

export { getStores };
