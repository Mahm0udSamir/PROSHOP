import { USER_ACTION_TYPES } from "./user.types";

const userInitState = {
  userInfo: null,
  errorLogin: null,
  errorRegister: null,
  errorUpdate: null,
  loading: false,
};

const userReducer = (state = userInitState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.USER_REGISTER_REQUEST:
    case USER_ACTION_TYPES.USER_LOGIN_REQUEST:
    case USER_ACTION_TYPES.USER_UPDATE_REQUEST:
      return { ...state, loading: true };

    case USER_ACTION_TYPES.USER_REGISTER_SUCCESS:
    case USER_ACTION_TYPES.USER_LOGIN_SUCCESS:
    case USER_ACTION_TYPES.USER_UPDATE_SUCCESS:
      return {
        errorUpdate: null,
        errorRegister: null,
        errorLogin: null,
        loading: false,
        userInfo: { ...state.userInfo, ...payload },
      };

    case USER_ACTION_TYPES.USER_REGISTER_FAIL:
      return { ...state, loading: false, errorRegister: payload };

    case USER_ACTION_TYPES.USER_LOGIN_FAIL:
      return { ...state, loading: false, errorLogin: payload };

    case USER_ACTION_TYPES.USER_UPDATE_FAIL:
      return { ...state, loading: false, errorUpdate: payload };

    case USER_ACTION_TYPES.USER_LOGOUT:
      return { userInfo: null };

    default:
      return state;
  }
};

export default userReducer;
