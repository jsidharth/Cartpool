import actionTypes from "../constants/index";
const intialState = {
  stores: [],
  currentStore:{}
};
const storeReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STORES_USER:
      const { stores } = action.payload;
      return { ...state, stores };
    default:
      break;
  }
  return state;
};

export default storeReducer;
