import actionTypes from "../constants/index";
const intialState = {
  pools: [],
  userPool:{}
};
const poolReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POOLS:
      const { pools } = action.payload;
      return { ...state, pools };
    default:
      break;
  }
  return state;
};

export default poolReducer;
