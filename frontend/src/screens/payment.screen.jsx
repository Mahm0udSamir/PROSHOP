import { useCallback, useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkout-steps.componet";
import FormContainer from "../components/form-container.component";
import { savePaymentMethod } from "../store/cart/cart.action";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../store/cart/cart.selector";
import { selectUserReducer } from "../store/user/user.selector";

const defaultForm = {
  paymentMethod: "Stripe",
};

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const savedPaymentMethod = useSelector(selectPaymentMethod);
  const { userInfo } = useSelector(selectUserReducer);

  const [formData, setFormData] = useState(defaultForm);
  const { paymentMethod } = formData;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=payment");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    !shippingAddress?.address && navigate("/shipping");
  }, [navigate, shippingAddress?.address]);

  useEffect(() => {
    savedPaymentMethod && setFormData({ paymentMethod: savedPaymentMethod });
  }, [savedPaymentMethod]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    },
    [dispatch, navigate, paymentMethod]
  );

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                disabled
                type="radio"
                label="PayPal"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={onChange}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe or Credit Card"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={onChange}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
