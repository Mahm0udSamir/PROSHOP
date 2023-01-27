import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItemsPrice,
  selectPaymentMethod,
} from "../store/cart/cart.selector";
import CheckoutSteps from "../components/checkout-steps.componet";
import Message from "../components/message.componet";
import Loader from "../components/loader.component";
import {
  getOrderDetails,
  payOrder,
  ressetOrder,
} from "../store/order/order.action";
import {
  selectOrderDetailsReducer,
  selectOrderPaidReducer,
} from "../store/order/order.selector";
import { selectUserReducer } from "../store/user/user.selector";
import PaymentForm from "../components/payment-form.component";
import { selectStripePaymentReducer } from "../store/stripe-payment/stripe.selector";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const paymentMethod = useSelector(selectPaymentMethod);
  const itemsPrice = useSelector(selectItemsPrice);
  const { order, loading, error } = useSelector(selectOrderDetailsReducer);
  const { success: successPay } = useSelector(selectOrderPaidReducer);
  const { userInfo } = useSelector(selectUserReducer);
  const { success: successPayUsingSripe } = useSelector(
    selectStripePaymentReducer
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (successPayUsingSripe) {
      console.log("successPayUsingSripe", successPayUsingSripe);
      dispatch(payOrder(orderId, successPayUsingSripe));
    }
  }, [dispatch, orderId, successPayUsingSripe]);

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch(ressetOrder());
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, order]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {order && (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {new Date(order.deliveredAt).toLocaleString()}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on {new Date(order.paidAt).toLocaleString()}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                  {loading && <Loader />}
                </ListGroup.Item>
                {!order.isPaid && paymentMethod === "Stripe" && (
                  <ListGroup.Item>
                    <PaymentForm amount={order.totalPrice}></PaymentForm>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderScreen;
