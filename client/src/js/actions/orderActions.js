import { toast } from "react-toastify";
import _ from "lodash";
import actionTypes from "../constants";

const addToCart = (productDetails) => (dispatch) => {
  console.log("Here", productDetails)
  try {
    const {
      id,
      name,
      brand,
      price,
      unit,
      storeId,
      storeName,
      currentCart,
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
              id,
              name,
              brand,
              price,
              unit,
            },
          ],
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

export { addToCart };
