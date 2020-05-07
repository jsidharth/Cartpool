import actionTypes from "../constants/index";
const intialState = {
  cart: {},
  userOrders: [],
  ordersToPickUp: []
};
const orderReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CART:
      const { cart } = action.payload;
      return { ...state, cart };

    default:
      break;
  }
  return state;
};

export default orderReducer;
