import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { STRIPE_PAYMENT_TYPES } from "./stripe.types";

export const payWithStripe =
  (stripe, elements, CardElement, amount) => async (dispatch, getState) => {
    try {
      dispatch(createAction(STRIPE_PAYMENT_TYPES.STRIPE_PAYMENT_REQUEST));
      const token = getState()?.user?.userInfo?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `/config/payment/stripe`,
        { amount: Math.round(+amount * 100) },
        config
      );
      console.log(response);
      const clientSecret = response?.data?.paymentIntent?.client_secret;
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: getState()?.user?.userInfo?.name,
          },
        },
      });
      if (paymentResult.error) {
        dispatch(
          createAction(
            STRIPE_PAYMENT_TYPES.STRIPE_PAYMENT_FAIL,
            paymentResult.error.message
          )
        );
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("Payment Successful!");
          dispatch(
            createAction(
              STRIPE_PAYMENT_TYPES.STRIPE_PAYMENT_SUCCESS,
              paymentResult.paymentIntent.id
            )
          );
        }
      }
    } catch (error) {
      console.log("error", error);
      const err = error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch(createAction(STRIPE_PAYMENT_TYPES.STRIPE_PAYMENT_FAIL, err));
    }
  };
