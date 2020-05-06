import actionTypes from "../constants/index";
const intialState = {
  user: {},
};
const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      const { user } = action.payload;
      return { ...state, user };
    default:
      break;
  }
  return state;
};

export default authReducer;
