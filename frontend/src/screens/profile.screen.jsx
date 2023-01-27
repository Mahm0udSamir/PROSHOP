import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader.component";
import Message from "../components/message.componet";
import { updateUserProfile } from "../store/user/user.action";
import { selectUserReducer } from "../store/user/user.selector";
import { getUserOrders } from "../store/order/order.action";
import { selectUserOrdersReducer } from "../store/order/order.selector";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errorUpdate, userInfo } = useSelector(selectUserReducer);
  const {
    orders,
    loading: loadingOrders,
    error: errorOrders,
  } = useSelector(selectUserOrdersReducer);
  const [formData, setFormData] = useState(defaultForm);
  const [message, setMessage] = useState(null);

  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    setFormData((prev) => {
      return {
        ...prev,
        name: userInfo.name,
        email: userInfo.email,
      };
    });
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  useEffect(() => {
    errorUpdate && setMessage({ text: errorUpdate, variant: "danger" });
  }, [errorUpdate]);

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setMessage(null);
      if (password !== confirmPassword) {
        setMessage({ text: "Passwords do not match", variant: "danger" });
      } else {
        await dispatch(updateUserProfile(name, email, password));
        !errorUpdate &&
          setMessage({ text: "Updated sucessfully", variant: "success" });
      }
    },
    [confirmPassword, dispatch, email, errorUpdate, name, password]
  );

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((oldValue) => {
      return { ...oldValue, [name]: value };
    });
  }, []);

  return (
    <Row className="mt-3">
      {message && <Message variant={message.variant}>{message.text}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Col md={3}>
            <h2>User Info</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  name="email"
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="name">
                <Form.Label></Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  name="name"
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  name="password"
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>

              <Button className="mt-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          new Date(order.paidAt).toLocaleDateString()
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          new Date(order.deliveredAt).toLocaleDateString()
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProfileScreen;
