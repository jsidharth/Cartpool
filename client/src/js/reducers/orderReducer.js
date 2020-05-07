import actionTypes from "../constants/index";
const intialState = {
  cart: {},
  userOrders: [],
  ordersToPickUp: [],
  currentOrder: {}
};
const orderReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CART:
      const { cart } = action.payload;
      return { ...state, cart };
    case actionTypes.SET_CURRENT_ORDER:
      const { currentOrder } = action.payload;
      return { ...state, currentOrder };
    case actionTypes.SET_SIMILAR_ORDERS:
      const { similarOrders } = action.payload;
      return { ...state, similarOrders };
    default:
      break;
  }
  return state;
};

export default orderReducer;
