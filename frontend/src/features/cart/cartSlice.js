import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProductDetails } from "./cartAPI"

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  error: null,
  total: 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
}

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (params, { rejectWithValue }) => {
    const { id, quantity } = params
    try {
      const { data } = await getProductDetails(id)
      const payload = {
        _id: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      }

      if (data.success === false) {
        throw data.message
      }
      return payload
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearErrors: (state, action) => {
      state.error = null
    },
    destroyState: (state, action) => {
      console.log(action)
      try {
        delete state[action.payload]
      } catch (_) {
        state[action.payload] = null
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i._id !== action.payload.id
      )

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

      let total = 0
      for (let item of state.cartItems) {
        total += item.price * item.quantity
      }
      state.total = total
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload))
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.loading = true
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false
      const item = action.payload
      const isPresent = state.cartItems.find((i) => i._id === item._id)
      if (isPresent) {
        for (let i = 0; i < state.cartItems.length; i++) {
          if (state.cartItems[i]._id === item._id) {
            state.cartItems[i].quantity = item.quantity
          }
        }
      } else {
        state.cartItems.push(item)
      }

      let total = 0
      for (let item of state.cartItems) {
        total += item.price * item.quantity
      }
      state.total = total

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearErrors, destroyState, removeFromCart, saveShippingInfo } =
  cartSlice.actions

export const selectCart = (state) => state.cart

export default cartSlice.reducer
