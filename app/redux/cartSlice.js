import { createSlice } from "@reduxjs/toolkit";
import { getCart, addToCart, removeFromCart } from "../api/cartApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCartItems, setLoading, setError } = cartSlice.actions;

// Thunk action to fetch cart items
export const fetchCartItems = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  if (!token) return;

  try {
    dispatch(setLoading(true));
    const cartData = await getCart(token);
    dispatch(setCartItems(cartData.items || []));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk action to add item to cart
export const addItemToCart = (productId, quantity,selectedSize) => async (dispatch, getState) => {
  const { token } = getState().auth;
  if (!token) return;

  try {
    dispatch(setLoading(true));
    await addToCart(productId, quantity,selectedSize, token);
    // Fetch updated cart after adding item
    dispatch(fetchCartItems());
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Thunk action to remove item from cart
export const removeItemFromCart = (productId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await removeFromCart(productId);
    // Fetch updated cart after removing item
    dispatch(fetchCartItems());
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default cartSlice.reducer;
