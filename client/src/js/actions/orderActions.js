import { toast } from "react-toastify";
import _ from "lodash";
import actionTypes from "../constants";

const addToCart = productDetails => dispatch => {
  console.log("Here", productDetails);
  try {
    const {
      id,
      name,
      brand,
      price,
      unit,
      storeId,
      storeName,
      currentCart
    } = productDetails;
    let cart;
    // Cart is empty
    if (_.isEmpty(currentCart)) {
      cart = {
        storeId,
        storeName,
        products: [
          {
            id,
            name,
            brand,
            price,
            unit,
            qty: 1
          }
        ]
      };
    } else {
      // Cart has items. Clear cart and add new product
      if (currentCart.storeId !== storeId) {
        cart = {
          storeId,
          storeName,
          products: [
            {
              id,
              name,
              brand,
              price,
              unit,
              qty: 1
            }
          ]
        };
      } else {
        // Add products to cart
        cart = { ...currentCart };
        cart.products.push({
          id,
          name,
          brand,
          price,
          unit,
          qty: 1
        });
      }
    }
    dispatch({
      type: actionTypes.UPDATE_CART,
      payload: {
        cart
      }
    });
    toast.success(`${name} added to cart`);
  } catch (err) {
    toast.error(err.message);
  }
};

const modifyProductQntyInCart = (prodId, cart, step) => dispatch => {
  const updatedCart = { ...cart };
  updatedCart.products = updatedCart.products.map(p => {
    if (p.id == prodId) {
      p.qty = p.qty + step;
    }
    return p;
  });
  dispatch({
    type: actionTypes.UPDATE_CART,
    payload: { cart: updatedCart }
  });
};

export { addToCart, modifyProductQntyInCart };
