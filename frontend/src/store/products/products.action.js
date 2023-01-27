import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { PRODUCTS_ACTION_TYPES, PRODUCT_ACTION_TYPES } from "./products.types";

export const getListProduct = () => async (dispatch) => {
  try {
    dispatch(createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_LIST_REQUEST));
    const { data } = await axios.get(`/api/product/`);
    dispatch(createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_LIST_SUCCESS, data));
  } catch (error) {
    const err = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_LIST_FAIL, err));
  }
};

export const getProductWithID = (id) => async (dispatch) => {
  try {
    dispatch(createAction(PRODUCT_ACTION_TYPES.PRODUCT_DETAILS_REQUEST));
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch(createAction(PRODUCT_ACTION_TYPES.PRODUCT_DETAILS_SUCCESS, data));
  } catch (error) {
    const err = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(createAction(PRODUCT_ACTION_TYPES.PRODUCT_DETAILS_FAIL, err));
  }
};
