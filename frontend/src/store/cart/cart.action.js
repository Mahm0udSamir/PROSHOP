import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import {
  CART_ITEMS_TYPES,
  PAYMEENT_METHODES,
  SHIPPING_ADRESS,
} from "./cart.types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // const product = getState().products.products.find((prod) => prod._id === id);
  const { data } = await axios.get(`/api/product/${id}`);
  const product = data;
  dispatch(
    createAction(CART_ITEMS_TYPES.ADD_CART_ITEMS, {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    })
  );
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch(createAction(CART_ITEMS_TYPES.REMOVE_CART_ITEMS, id));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(createAction(SHIPPING_ADRESS.SAVE_SHIPPING_ADRESS, data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(createAction(PAYMEENT_METHODES.SAVE_PAYMEENT_METHODES, data));
};
