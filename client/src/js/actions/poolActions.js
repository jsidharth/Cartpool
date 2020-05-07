import { toast } from "react-toastify";
import axios from "axios";
import server from "./../../config/server";
import actionTypes from "../constants";

const createPool = (poolDetails, props) => async dispatch => {
  try {
    await axios.post(
      `http://${server.domain}:${server.port}/pool`,
      poolDetails
    );
    toast.success("Pool created!");
    props.history.push("/pool/browse");
  } catch (err) {
    toast.error(err.response.data);
  }
};

const getPools = () => async dispatch => {
  try {
    const pools = await axios.get(
      `http://${server.domain}:${server.port}/pools`
    );
    // console.log(pools)
    dispatch({
      type: actionTypes.SET_POOLS,
      payload: {
        pools: pools.data
      }
    });
  } catch (err) {
    toast.error(err.response.data);
  }
};

const getUserPool = () => async dispatch => {
  try {
    const userPool = await axios.get(
      `http://${server.domain}:${server.port}/pool`
    );
    // console.log(pools)
    dispatch({
      type: actionTypes.SET_USER_POOL,
      payload: {
        userPool: userPool.data
      }
    });
  } catch (err) {
    toast.error(err.response.data);
  }
};

const requestToJoinPool = (id, screenName) => async dispatch => {
  let endPoint = `http://${server.domain}:${server.port}/joinpool?poolId=${id}`;
  if (screenName && screenName !== "") {
    endPoint = `${endPoint}&screenName=${screenName}`;
  }
  try {
    const { data: response } = await axios.post(endPoint);
    toast.success(response);
  } catch (err) {
    toast.error(err.response.data);
  }
};

export { createPool, getPools, getUserPool, requestToJoinPool };
