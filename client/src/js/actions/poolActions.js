import { toast } from "react-toastify";
import axios from "axios";
import server from "./../../config/server";
import actionTypes from "../constants";

const createPool = (poolDetails) => async (dispatch) => {
  try {
    await axios.post(
      `http://${server.domain}:${server.port}/pool`,
      poolDetails
    );
    toast.success("Pool created!");
  } catch (err) {
    toast.error(err.message);
  }
};

const getPools = () => async (dispatch) => {
    try {
        const pools = await axios.get(`http://${server.domain}:${server.port}/pool`);
        dispatch({
            type: actionTypes.SET_POOLS,
            payload: {
                pools: pools.data
            }
        });
    }catch(err) {
        toast.error(err.message);
    }
}

export { createPool, getPools };
