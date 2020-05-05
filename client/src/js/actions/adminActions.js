import actionTypes from "./../constants/index";
import firebase from "../../config/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import server from "./../../config/server";

const getProducts = () => async dispatch => {
  try {
    const { data: products } = await axios.get(
      `http://${server.domain}:${server.port}/products`
    );
    console.log("action get products", products);
    dispatch({ type: actionTypes.SET_PRODUCTS, payload: { products } });
  } catch (err) {
    toast.error(err.message);
  }
};

const addProduct = (payload, ownProps) => async dispatch => {
  try {
    const { data: product } = await axios.post(
      `http://${server.domain}:${server.port}/products`,
      payload
    );
    console.log("action add products", product);
    //dispatch({ type: actionTypes.SET_PRODUCTS, payload: { products } });
    dispatch(getProducts());
    ownProps.history.push("/admin/products");

    toast.success("Product added with id " + product.id);
  } catch (err) {
    toast.error(err.message);
  }
};

const getProductById = productId => async dispatch => {
  try {
    const { data: product } = await axios.get(
      `http://${server.domain}:${server.port}/products/${productId}`
    );
    console.log("action getProductById", product);
    //toast.success("Product added with id" + product.id);
    dispatch({
      type: actionTypes.SET_CURRENT_PRODUCT,
      payload: { product }
    });
  } catch (err) {
    toast.error(err.message);
  }
};

const updateProduct = (payload, ownProps) => async dispatch => {
  try {
    const { data: product } = await axios.put(
      `http://${server.domain}:${server.port}/products`,
      payload
    );
    //console.log("action add products", product);
    //dispatch({ type: actionTypes.SET_PRODUCTS, payload: { products } });
    dispatch(getProducts());
    ownProps.history.push("/admin/products");

    toast.success("Product with id " + product.id + " edited");
  } catch (err) {
    toast.error(err.message);
  }
};
const deleteProduct = productId => async dispatch => {
  try {
    await axios.delete(
      `http://${server.domain}:${server.port}/products/${productId}`
    );
    dispatch(getProducts());
    toast.success("Product with id " + productId + " deleted");
  } catch (err) {
    toast.error(err.message);
  }
};

export {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
