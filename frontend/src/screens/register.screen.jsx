import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader.component";
import Message from "../components/message.componet";
import { register } from "../store/user/user.action";
import FormContainer from "../components/form-container.component";
import { selectUserReducer } from "../store/user/user.selector";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userRegister = useSelector(selectUserReducer);
  const [formData, setFormData] = useState(defaultForm);
  const [message, setMessage] = useState(null);

  const { name, email, password, confirmPassword } = formData;

  const { loading, errorRegister, userInfo } = userRegister;

  const redirect = location.search ? `${location.search.split("=")[1]}` : "/";

  console.log(location.search);
  console.log(redirect);
  useEffect(() => {
    if (userInfo) {
      console.log(redirect);
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      setMessage(null);
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
      } else {
        dispatch(register(name, email, password));
      }
    },
    [confirmPassword, dispatch, email, name, password]
  );

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((oldValue) => {
      return { ...oldValue, [name]: value };
    });
  }, []);

  return (
    <FormContainer>
      <h1>Register</h1>
      {errorRegister && <Message variant="danger">{errorRegister}</Message>}
      {message && <Message variant="danger">{message}</Message>}
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

        <Form.Group controlId="name">
          <Form.Label></Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            name="name"
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

        <Form.Group controlId="confirmPassword">
          <Form.Label></Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            required
            onChange={onChange}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
