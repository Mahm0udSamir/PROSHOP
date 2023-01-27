import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

///////// register
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(createAction(USER_ACTION_TYPES.USER_REGISTER_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/users/",
      { name, email, password },
      config
    );
    dispatch(createAction(USER_ACTION_TYPES.USER_REGISTER_SUCCESS, data));
    dispatch(autoLogout(data.expireIn));
  } catch (error) {
    const err = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(createAction(USER_ACTION_TYPES.USER_REGISTER_FAIL, err));
  }
};

///////// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(createAction(USER_ACTION_TYPES.USER_LOGIN_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/users/login",
      { email, password },
      config
    );
    dispatch(createAction(USER_ACTION_TYPES.USER_LOGIN_SUCCESS, data));
    dispatch(autoLogout(data.expireIn));
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const err = error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(createAction(USER_ACTION_TYPES.USER_LOGIN_FAIL, err));
  }
};

////////// update user
export const updateUserProfile =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch(createAction(USER_ACTION_TYPES.USER_UPDATE_REQUEST));
      const token = getState()?.user?.userInfo?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "api/users/profile",
        { name, email, password },
        config
      );
      dispatch(createAction(USER_ACTION_TYPES.USER_UPDATE_SUCCESS, data));
    } catch (error) {
      const err = error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch(createAction(USER_ACTION_TYPES.USER_UPDATE_FAIL, err));
    }
  };

///////////// logout
export const logout = () => (dispatch) => {
  dispatch(createAction(USER_ACTION_TYPES.USER_LOGOUT));
};

///////////// auto logout
export const autoLogout =
  (tokenExpiredDate = null) =>
  (dispatch, getState) => {
    const expiredDate =
      tokenExpiredDate || getState()?.user?.userInfo?.expireIn;
    if (!expiredDate) return;

    const remainingTime = expiredDate - new Date().getTime();
    setTimeout(() => {
      dispatch(createAction(USER_ACTION_TYPES.USER_LOGOUT));
    }, remainingTime);
  };
