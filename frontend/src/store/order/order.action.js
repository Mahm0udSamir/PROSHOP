import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { logout } from "../user/user.action";
import { ORDER_ACTION_TYPES } from "./order.types";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(createAction(ORDER_ACTION_TYPES.ORDER_CREATE_REQUEST));
    const token = getState()?.user?.userInfo?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`/api/order/`, order, config);
    dispatch(createAction(ORDER_ACTION_TYPES.ORDER_CREATE_SUCCESS, data));
  } catch (error) {
    const err = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(createAction(ORDER_ACTION_TYPES.ORDER_CREATE_FAIL, err));
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(createAction(ORDER_ACTION_TYPES.ORDER_DETAILS_REQUEST));
    const token = getState()?.user?.userInfo?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/order/${id}`, config);
    dispatch(createAction(ORDER_ACTION_TYPES.ORDER_DETAILS_SUCCESS, data));
  } catch (error) {
    const err = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(createAction(ORDER_ACTION_TYPES.ORDER_DETAILS_FAIL, err));
  }
};

export const ressetOrder = () => async (dispatch) => {
  dispatch(createAction(ORDER_ACTION_TYPES.ORDER_PAY_RESSET));
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(createAction(ORDER_ACTION_TYPES.ORDER_PAY_REQUEST));

      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/order/${orderId}/pay`,
        { id: paymentResult },
        config
      );

      dispatch(createAction(ORDER_ACTION_TYPES.ORDER_PAY_SUCCESS, data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch(createAction(ORDER_ACTION_TYPES.ORDER_PAY_FAIL, message));
    }
  };

//////// get user orders
export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch(createAction(ORDER_ACTION_TYPES.USER_ORDERS_REQUEST));
    const token = getState()?.user?.userInfo?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/order/userorders`, config);
    dispatch(createAction(ORDER_ACTION_TYPES.USER_ORDERS_SUCCESS, data));
  } catch (error) {
    const err = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(createAction(ORDER_ACTION_TYPES.USER_ORDERS_FAIL, err));
  }
};
