import { toast } from "react-toastify";
import _ from "lodash";
import axios from "axios";
import server from "./../../config/server";
import actionTypes from "../constants";

const addToCart = (productDetails) => (dispatch) => {
  console.log("Here", productDetails);
  try {
    const {
      storeId,
      storeName,
      currentCart,
      ...curProduct
    } = productDetails;
    let cart;
    // Cart is empty
    if (_.isEmpty(currentCart)) {
      cart = {
        storeId,
        storeName,
        products: [
          {
            qty: 1,
            ...curProduct
          },
        ],
      };
    } else {
      // Cart has items. Clear cart and add new product
      if (currentCart.storeId !== storeId) {
        cart = {
          storeId,
          storeName,
          products: [
            {
              qty: 1,
              ...curProduct
            },
          ],
        };
      } else {
        // Add products to cart
        cart = { ...currentCart };
        cart.products.push({
          qty: 1,
          ...curProduct
        });
        cart.products = _.uniqBy(cart.products, 'psId')
      }
    }
    dispatch({
      type: actionTypes.UPDATE_CART,
      payload: {
        cart,
      },
    });
    toast.success(`${curProduct.name} added to cart`);
  } catch (err) {
    toast.error(err.message);
  }
};

const modifyProductQntyInCart = (prodId, cart, step) => (dispatch) => {
  const updatedCart = { ...cart };
  updatedCart.products = updatedCart.products.map((p) => {
    if (p.id === prodId) {
      p.qty = p.qty + step;
    }
    return p;
  });
  dispatch({
    type: actionTypes.UPDATE_CART,
    payload: { cart: updatedCart },
  });
};

const deleteProductFromCart = (prodId, cart) => (dispatch) => {
  const currCart = { ...cart };
  currCart.products = currCart.products.filter((p) => p.id !== prodId);
  dispatch({
    type: actionTypes.UPDATE_CART,
    payload: { cart: currCart },
  });
};

const placeOrder = (orderDetails) => async (dispatch) => {
  try {
    const { userId, storeId, productStore, total } = orderDetails;
    const pool = await axios.get(`http://${server.domain}:${server.port}/pool`);
    //TODO: Total price calculation move to backend
    if (pool) {
      const payload = {
        storeId,
        userId: userId,
        poolId: pool.id,
        total,
        productStoreList: productStore,
      };
      const currentOrder = await axios.post(
        `http://${server.domain}:${server.port}/orders`,
        payload
      );
      dispatch({
        type: actionTypes.SET_CURRENT_ORDER,
        payload:{
          currentOrder
        }
      });
      // CLEAR THE CART
      dispatch({
        type: actionTypes.UPDATE_CART,
        payload: { cart: {} },
      });
      toast.success(`Your Order has been placed!`);
    } else {
      toast.error("Please join a pool to place order!");
    }
    
  } catch (err) {
    toast.error(err.message);
  }
};

export {
  addToCart,
  modifyProductQntyInCart,
  deleteProductFromCart,
  placeOrder,
};
