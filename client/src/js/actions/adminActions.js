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
    toast.error(err.response.data);
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
    ownProps.history.push(`/admin/products/dv/${product.id}`);

    toast.success("Product added with id " + product.id);
  } catch (err) {
    toast.error(err.response.data);
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
    toast.error(err.response.data);
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
    toast.error(err.response.data);
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
    toast.error(err.response.data);
  }
};

const addStore = (payload, ownProps) => async dispatch => {
  try {
    const { data: store } = await axios.post(
      `http://${server.domain}:${server.port}/store`,
      payload
    );
    console.log("action add store", store);
    //dispatch({ type: actionTypes.SET_PRODUCTS, payload: { products } });
    dispatch(getStores());
    ownProps.history.push("/admin/stores");
    toast.success("Store added with id " + store);
  } catch (err) {
    toast.error(err.response.data);
  }
};

const getStores = () => async dispatch => {
  try {
    const { data: stores } = await axios.get(
      `http://${server.domain}:${server.port}/store`
    );
    console.log("action get stores", stores);
    dispatch({ type: actionTypes.SET_STORES, payload: { stores } });
  } catch (err) {
    toast.error(err.response ? err.response.data : 'Eror occured');
  }
};

const getStoreByName = storeName => async dispatch => {
  try {
    const { data: store } = await axios.get(
      `http://${server.domain}:${server.port}/store/${storeName}`
    );
    console.log("action getStoreByName", store);
    //toast.success("Product added with id" + product.id);
    dispatch({
      type: actionTypes.SET_CURRENT_STORE,
      payload: { store }
    });
    dispatch(getProductsInStore(store.id));
  } catch (err) {
    toast.error(err.response.data);
  }
};

const updateStore = (payload, ownProps) => async dispatch => {
  try {
    const { data: store } = await axios.put(
      `http://${server.domain}:${server.port}/store`,
      payload
    );
    console.log("action updateStore", store);
    //dispatch({ type: actionTypes.SET_PRODUCTS, payload: { products } });
    toast.success("Store with id " + store.id + " edited");
    dispatch(getStores());
    ownProps.history.push("/admin/stores");
  } catch (err) {
    toast.error(err.response.data);
  }
};

const deleteStore = storeId => async dispatch => {
  try {
    await axios.delete(
      `http://${server.domain}:${server.port}/store/${storeId}`
    );
    dispatch(getStores());
    toast.success("Store  " + storeId + " deleted");
  } catch (err) {
    toast.error(err.response.data);
  }
};

const getStoresWithProduct = productId => async dispatch => {
  try {
    const { data: stores } = await axios.get(
      `http://${server.domain}:${server.port}/productstore/allstores/${productId}`
    );
    console.log("action getStoresWithProduct", stores);
    //toast.success("Product added with id" + product.id);
    dispatch({
      type: actionTypes.SET_STORES_WITH_PRODUCT,
      payload: { stores }
    });
  } catch (err) {
    toast.error(err.response.data);
  }
};

const addProductToStore = (payload, productId) => async dispatch => {
  try {
    await axios.post(
      `http://${server.domain}:${server.port}/productstore/multiadd`,
      payload
    );

    dispatch(getStores());
    dispatch(getStoresWithProduct(productId));

    toast.success("Product added to the Stores ");
  } catch (err) {
    toast.error(err.response.data);
  }
};

const getProductsInStore = storeId => async dispatch => {
  try {
    const { data: products } = await axios.get(
      `http://${server.domain}:${server.port}/productstore/${storeId}`
    );
    console.log("action getProductsInStore", products);
    //toast.success("Product added with id" + product.id);
    dispatch({
      type: actionTypes.SET_PRODUCTS_OF_STORE,
      payload: { products }
    });
  } catch (err) {
    toast.error(err.response.data);
  }
};

export {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addStore,
  getStores,
  getStoreByName,
  updateStore,
  deleteStore,
  getStoresWithProduct,
  addProductToStore,
  getProductsInStore
};
