import actionTypes from "../constants/index";
const intialState = {
  cart: {},
  userOrders: [],
  ordersToPickUp: []
};
const orderReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CART:
      const { pools } = action.payload;
      return { ...state, pools };
    case actionTypes.CLEAR_CART:
      const { userPool } = action.payload;
      return { ...state, userPool };
    default:
      break;
  }
  return state;
};

export default orderReducer;
