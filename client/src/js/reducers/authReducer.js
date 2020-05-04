import actionTypes from "../constants/index";
const intialState = {
  signup: false, // TODO: Remove this
  signin: false, // TODO: Remove this
  user: {}
};
const authReducer = (state = intialState, action) => {
  switch (action.type) {
    //TODO: Remove this
    case actionTypes.SIGNUP_SUCCESS:
      const { signup } = action.payload;
      return { ...state, signup };
    case actionTypes.SIGNIN_SUCCESS:
      const { user } = action.payload;
      return { ...state, user };
    default:
      break;
  }
  return state;
};

export default authReducer;
