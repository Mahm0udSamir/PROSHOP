import { PRODUCTS_ACTION_TYPES, PRODUCT_ACTION_TYPES } from "./products.types";

const initProjectsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = (state = initProjectsState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_ACTION_TYPES.PRODUCTS_LIST_REQUEST:
      return { ...state, loading: true };

    case PRODUCTS_ACTION_TYPES.PRODUCTS_LIST_FAIL:
      return { ...state, loading: false, error: payload };

    case PRODUCTS_ACTION_TYPES.PRODUCTS_LIST_SUCCESS:
      return { error: null, loading: false, products: payload };

    default:
      return state;
  }
};

const initProjectState = {
  product: null,
  loading: false,
  error: null,
};

export const productReducer = (state = initProjectState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_ACTION_TYPES.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_ACTION_TYPES.PRODUCT_DETAILS_SUCCESS:
      return { error: null, loading: false, product: payload };

    case PRODUCT_ACTION_TYPES.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
