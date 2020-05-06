import actionTypes from "../constants/index";
const intialState = {
  products: [],
  stores: [],
  storesWithProduct: []
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
    case actionTypes.SET_STORES:
      const { stores } = action.payload;
      return { ...state, stores };
    case actionTypes.SET_CURRENT_STORE:
      const { store: currentStore } = action.payload;
      return { ...state, currentStore };
    case actionTypes.SET_STORES_WITH_PRODUCT:
      const { stores: storesWithProduct } = action.payload;
      return { ...state, storesWithProduct };
    default:
      break;
  }
  return state;
};

export default adminReducer;
