import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import Loader from "./loader.component";
import { useDispatch, useSelector } from "react-redux";
import { selectStripePaymentReducer } from "../store/stripe-payment/stripe.selector";
import { payWithStripe } from "../store/stripe-payment/stripe.action";
import Message from "./message.componet";

const PaymentForm = ({ amount }) => {
  const { loading, error } = useSelector(selectStripePaymentReducer);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    dispatch(payWithStripe(stripe, elements, CardElement, amount));
  };

  return (
    <div className="PaymentFormContainer">
      <form className="FormContainer" onSubmit={paymentHandler}>
        <h5>Credit Card Payment:</h5>
        <CardElement />
        {loading ? (
          <Loader />
        ) : (
          <Button className="PaymentButton" type="submit" variant="primary">
            Pay Now
          </Button>
        )}
      </form>

      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};
export default PaymentForm;
