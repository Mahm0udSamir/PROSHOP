import { cartItemsReducer } from "./cart/cart.reducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  userOrdersReducer,
} from "./order/order.reducer";
import { productsReducer, productReducer } from "./products/products-reducer";
import { stripePaymentReducer } from "./stripe-payment/stripe.reducer";
import userReducer from "./user/user.reducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartItemsReducer,
  user: userReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  stripePayment: stripePaymentReducer,
  userOrders: userOrdersReducer,
});

export default rootReducer;
