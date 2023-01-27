import { createSelector } from "reselect";
import { addDecimals } from "../../utils/common/number";

export const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (selectCartReducer) => selectCartReducer.cartItems
);

export const selectSubTotal = createSelector(
  [selectCartReducer],
  ({ cartItems }) => cartItems.reduce((acc, item) => acc + item.qty, 0)
);

export const selectItemsPrice = createSelector(
  [selectCartReducer],
  ({ cartItems }) =>
    addDecimals(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))
);

export const selectShippingPrice = createSelector(
  [selectItemsPrice],
  (itemsPrice) => addDecimals(itemsPrice > 100 ? 0 : 100)
);

export const selectTaxPrice = createSelector([selectItemsPrice], (itemsPrice) =>
  addDecimals(0.15 * itemsPrice)
);

export const selectTotalPrice = createSelector(
  [selectItemsPrice, selectShippingPrice, selectTaxPrice],
  (itemsPrice, shippingPrice, taxPrice) =>
    addDecimals(itemsPrice + shippingPrice + taxPrice)
);

export const selectShippingAddress = createSelector(
  [selectCartReducer],
  (selectCartSlice) => selectCartSlice.shippingAddress
);

export const selectPaymentMethod = createSelector(
  [selectCartReducer],
  (selectCartSlice) => selectCartSlice.paymentMethod
);
