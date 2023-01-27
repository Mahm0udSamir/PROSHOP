import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer.component";
import Header from "./components/header.component";
import CartScreen from "./screens/cart.screen";
import HomeScreen from "./screens/home.screen";
import LoginScreen from "./screens/login.screen";
import OrderScreen from "./screens/order.screen";
import PaymentScreen from "./screens/payment.screen";
import PlaceOrderScreen from "./screens/place-order.screen";
import ProductScreen from "./screens/product.screen";
import ProfileScreen from "./screens/profile.screen";
import RegisterScreen from "./screens/register.screen";
import ShippingScreen from "./screens/shipping.screen";
import { autoLogout } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogout());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/">
              <Route index element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/cart" element={<CartScreen />}>
                <Route path=":id" element={<CartScreen />} />
              </Route>
            </Route>
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
