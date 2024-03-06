import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    Cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.Cart.find((val) => val.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.Cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const index = state.Cart.findIndex((val) => val.id === action.payload.id);
      if (index !== -1) {
        state.Cart.splice(index, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.Cart.find((val) => val.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.Cart.find((val) => val.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          const index = state.Cart.findIndex((val) => val.id === action.payload.id);
          if (index !== -1) {
            state.Cart.splice(index, 1);
          }
        }
      }
    },
    cleanCart: (state, action) => {
      state.Cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export default CartSlice.reducer;
