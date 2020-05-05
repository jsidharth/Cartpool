import actionTypes from "../constants/index";
const intialState = {
  products: []
};
const adminReducer = (state = intialState, action) => {
  switch (action.type) {
    //TODO: Remove this
    case actionTypes.SET_PRODUCTS:
      const { products } = action.payload;
      return { ...state, products };
    case actionTypes.SET_CURRENT_PRODUCT:
      const { product: currentProduct } = action.payload;
      // console.log(action.payload);
      return { ...state, currentProduct };
    default:
      break;
  }
  return state;
};

export default adminReducer;
