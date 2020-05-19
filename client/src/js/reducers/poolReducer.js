import actionTypes from "../constants/index";
const intialState = {
  pools: [],
  userPool: {},
};
const poolReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POOLS:
      const { pools } = action.payload;
      return { ...state, pools };
    case actionTypes.SET_USER_POOL:
      const { userPool } = action.payload;
      return { ...state, userPool };
    case actionTypes.CLEAR_USER_POOL:
      return { ...state, userPool: {} };
    case actionTypes.CLEAR_POOLS:
      return { ...state, pools: {} };
    default:
      break;
  }
  return state;
};

export default poolReducer;
