import { toast } from "react-toastify";
import _ from "lodash";
import axios from "axios";
import server from "./../../config/server";
import actionTypes from "../constants";

const addToCart = productDetails => dispatch => {
  console.log("Here", productDetails);
  try {
    const { storeId, storeName, currentCart, ...curProduct } = productDetails;
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
              qty: 1,
              ...curProduct
            }
          ]
        };
      } else {
        // Add products to cart
        cart = { ...currentCart };
        cart.products.push({
          qty: 1,
          ...curProduct
        });
        cart.products = _.uniqBy(cart.products, "psId");
      }
    }
    dispatch({
      type: actionTypes.UPDATE_CART,
      payload: {
        cart
      }
    });
    toast.success(`${curProduct.name} added to cart`);
  } catch (err) {
    toast.error(err.response.data);
  }
};

const modifyProductQntyInCart = (prodId, cart, step) => dispatch => {
  const updatedCart = { ...cart };
  updatedCart.products = updatedCart.products.map(p => {
    if (p.id === prodId) {
      p.qty = p.qty + step;
    }
    return p;
  });
  dispatch({
    type: actionTypes.UPDATE_CART,
    payload: { cart: updatedCart }
  });
};

const deleteProductFromCart = (prodId, cart) => dispatch => {
  const currCart = { ...cart };
  currCart.products = currCart.products.filter(p => p.id !== prodId);
  dispatch({
    type: actionTypes.UPDATE_CART,
    payload: { cart: currCart }
  });
};

const placeOrder = (orderDetails, ownProps) => async dispatch => {
  try {
    const { userId, storeId, productStore, total } = orderDetails;
    const { data: pool } = await axios.get(
      `http://${server.domain}:${server.port}/pool`
    );
    //TODO: Total price calculation move to backend
    console.log("Pool after order placing", pool);
    if (!_.isEmpty(pool)) {
      const payload = {
        storeId,
        userId: userId,
        poolId: pool.id,
        total,
        productStoreList: productStore
      };
      const { data: currentOrder } = await axios.post(
        `http://${server.domain}:${server.port}/orders`,
        payload
      );
      // CLEAR THE CART
      dispatch({
        type: actionTypes.UPDATE_CART,
        payload: { cart: {} }
      });
      toast.success(`Your Order has been placed!`);
      ownProps.history.replace(`/order_placed/${currentOrder}`);
    } else {
      toast.error("Please join a pool to place order!");
    }
  } catch (err) {
    if (err && err.response) {
      toast.error(err.response.data);
    } else {
      toast.error("Can't place order");
    }
  }
};

const getUserOrders = id => async dispatch => {
  try {
    const { data: userOrders } = await axios.get(
      `http://${server.domain}:${server.port}/orders/${id}`
    );
    dispatch({
      type: actionTypes.SET_USER_ORDERS,
      payload: {
        userOrders
      }
    });
  } catch (err) {
    toast.error(err.message);
  }
};

const getAssignedOrders = () => async dispatch => {
  try {
    const { data: assignedOrders } = await axios.get(
      `http://${server.domain}:${server.port}/getAllOrdersAssignedTo`
    );
    dispatch({
      type: actionTypes.SET_ASSIGNED_ORDERS,
      payload: {
        assignedOrders
      }
    });
  } catch (err) {
    toast.error(err.message);
  }
};

const getOrderById = orderId => async dispatch => {
  try {
    const { data: order } = await axios.get(
      `http://${server.domain}:${server.port}/order/${orderId}`
    );
    console.log("action getOrderById", order);
    //toast.success("Product added with id" + product.id);
    dispatch({
      type: actionTypes.SET_CURRENT_ORDER,
      payload: { currentOrder: order }
    });
  } catch (err) {
    toast.error(err.response.data);
  }
};

const getSimilarOrdersFromPool = orderId => async dispatch => {
  try {
    const { data: orders } = await axios.get(
      `http://${server.domain}:${server.port}/getUnassignedOrdersOfStoreInPool/${orderId}`
    );
    console.log("action getSimilarOrdersFromPool", orders);
    //toast.success("Product added with id" + product.id);
    dispatch({
      type: actionTypes.SET_SIMILAR_ORDERS,
      payload: { similarOrders: orders }
    });
  } catch (err) {
    toast.error(err.response.data);
  }
};

const pickupOrders = (data, ownProps) => async dispatch => {
  try {
    await axios.put(
      `http://${server.domain}:${server.port}/orders/assignToUser/`,
      data
    );
    console.log("action pickupOrders completed!");
    toast.success("Orders added for pickup");
    // dispatch({
    //   type: actionTypes.SET_SIMILAR_ORDERS,
    //   payload: { similarOrders: orders }
    // });
    ownProps.history.replace("/order/assignedorders");
  } catch (err) {
    toast.error(err.response.data);
  }
};

const updateOrder = (orderId, orderStatus) => async dispatch => {
  try {
    const { data: order } = await axios.get(
      `http://${server.domain}:${server.port}/update/order/${orderId}/${orderStatus}`
    );
    console.log("action updateOrder !", order);
    //toast.success("Orders added for pickup");
    dispatch(getOrderById(orderId));
    //ownProps.history.replace("/order/assignedorders");
  } catch (err) {
    if (err && err.response) {
      toast.error(err.response.data);
    } else {
      toast.error(err);
    }
  }
};

export {
  addToCart,
  modifyProductQntyInCart,
  deleteProductFromCart,
  placeOrder,
  getUserOrders,
  getAssignedOrders,
  getOrderById,
  getSimilarOrdersFromPool,
  pickupOrders,
  updateOrder
};
