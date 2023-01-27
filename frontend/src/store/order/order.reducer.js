import { ORDER_ACTION_TYPES } from "./order.types";

const initState = {
  order: null,
  loading: false,
  error: null,
};

export const orderCreateReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_ACTION_TYPES.ORDER_CREATE_REQUEST:
      return { ...state, loading: true };

    case ORDER_ACTION_TYPES.ORDER_CREATE_SUCCESS:
      return { error: null, loading: false, order: payload };

    case ORDER_ACTION_TYPES.ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: payload };

    case ORDER_ACTION_TYPES.ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_ACTION_TYPES.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_ACTION_TYPES.ORDER_DETAILS_SUCCESS:
      return { error: null, loading: false, order: payload };

    case ORDER_ACTION_TYPES.ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

////////////// OrderPayReducer
const initOrderPay = {
  loading: false,
  success: false,
  error: null,
};

export const orderPayReducer = (state = initOrderPay, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_ACTION_TYPES.ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_ACTION_TYPES.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };

    case ORDER_ACTION_TYPES.ORDER_PAY_RESSET:
      return {};

    case ORDER_ACTION_TYPES.ORDER_PAY_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

///////////// user orders
const initUserOrders = {
  orders: [],
  loading: false,
  error: null,
};
export const userOrdersReducer = (state = initUserOrders, action) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_ACTION_TYPES.USER_ORDERS_REQUEST:
      return { ...state, loading: true };

    case ORDER_ACTION_TYPES.USER_ORDERS_SUCCESS:
      return { error: null, loading: false, orders: payload };

    case ORDER_ACTION_TYPES.USER_ORDERS_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
