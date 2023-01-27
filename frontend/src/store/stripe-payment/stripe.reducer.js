import { STRIPE_PAYMENT_TYPES } from "./stripe.types";

const initState = {
  loading: false,
  success: null,
  error: false,
};

export const stripePaymentReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STRIPE_PAYMENT_TYPES.STRIPE_PAYMENT_REQUEST:
      return { ...state, loading: true };

    case STRIPE_PAYMENT_TYPES.STRIPE_PAYMENT_SUCCESS:
      return { error: null, loading: false, success: payload };

    case STRIPE_PAYMENT_TYPES.STRIPE_PAYMENT_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
