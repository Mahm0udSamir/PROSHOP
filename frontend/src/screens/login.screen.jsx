import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader.component";
import Message from "../components/message.componet";
import { login } from "../store/user/user.action";
import FormContainer from "../components/form-container.component";
import { selectUserReducer } from "../store/user/user.selector";

const defaultForm = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useSelector(selectUserReducer);
  const [formData, setFormData] = useState(defaultForm);

  const { email, password } = formData;

  const { loading, errorLogin, userInfo } = userLogin;

  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    },
    [dispatch, email, password]
  );

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((oldValue) => {
      return { ...oldValue, [name]: value };
    });
  }, []);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {errorLogin && <Message variant="danger">{errorLogin}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            required
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
            required
            onChange={onChange}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
