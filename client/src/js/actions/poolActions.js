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
        const pools = await axios.get(`http://${server.domain}:${server.port}/pools`);
        // console.log(pools)
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

const getUserPool = () => async (dispatch) => {
  try {
      const userPool = await axios.get(`http://${server.domain}:${server.port}/pool`);
      // console.log(pools)
      dispatch({
          type: actionTypes.SET_USER_POOL,
          payload: {
            userPool: userPool.data
          }
      });
  }catch(err) {
      toast.error(err.message);
  }
}

export { createPool, getPools, getUserPool };
