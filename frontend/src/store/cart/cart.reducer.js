import {
  CART_ITEMS_TYPES,
  PAYMEENT_METHODES,
  SHIPPING_ADRESS,
} from "./cart.types";

const addItemToCartHelper = (cartItems, item) => {
  const index = cartItems.findIndex((i) => i.product === item.product);
  if (index > -1) {
    cartItems[index] = item;
    return cartItems;
  }
  return [...cartItems, item];
};

const removeItemHelper = (cartItems, product) => {
  return cartItems.filter((item) => item.product !== product);
};
////////////////////////////

const initCartItems = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: null,
};

export const cartItemsReducer = (state = initCartItems, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ITEMS_TYPES.ADD_CART_ITEMS:
      return {
        ...state,
        cartItems: addItemToCartHelper(state.cartItems, payload),
      };

    case CART_ITEMS_TYPES.REMOVE_CART_ITEMS:
      return {
        ...state,
        cartItems: removeItemHelper(state.cartItems, payload),
      };

    case SHIPPING_ADRESS.SAVE_SHIPPING_ADRESS:
      return { ...state, shippingAddress: payload };

    case PAYMEENT_METHODES.SAVE_PAYMEENT_METHODES:
      return { ...state, paymentMethod: payload };

    default:
      return state;
  }
};
