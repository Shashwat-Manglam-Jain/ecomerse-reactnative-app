import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";

export default configureStore({
  reducer: { Cart: CartReducer },
});
