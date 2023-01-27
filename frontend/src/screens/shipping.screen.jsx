import { useCallback, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkout-steps.componet";
import FormContainer from "../components/form-container.component";
import { saveShippingAddress } from "../store/cart/cart.action";
import { selectShippingAddress } from "../store/cart/cart.selector";
import { selectUserReducer } from "../store/user/user.selector";

const defaultForm = {
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector(selectShippingAddress);
  const { userInfo } = useSelector(selectUserReducer);

  const [formData, setFormData] = useState(defaultForm);
  const { address, city, postalCode, country } = formData;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    shippingAddress &&
      setFormData({
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      });
  }, [shippingAddress]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(saveShippingAddress(formData));
      navigate("/payment");
    },
    [dispatch, formData, navigate]
  );

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              name="address"
              required
              onChange={onChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              name="city"
              required
              onChange={onChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              name="postalCode"
              required
              onChange={onChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              name="country"
              required
              onChange={onChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
