import { createSelector } from "reselect";
import { addDecimals } from "../../utils/common/number";

export const selectOrderCreateReducer = (state) => state.orderCreate;

export const selectOrderDetailsReducer = (state) => state.orderDetails;

export const selectOrderPaidReducer = (state) => state.orderPay;

export const selectUserOrdersReducer = (state) => state.userOrders;

export const selectItemsPrice = createSelector(
  [selectOrderDetailsReducer],
  ({ order }) =>
    addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    )
);
