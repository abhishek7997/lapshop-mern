import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "../features/productsList/productsListSlice"
import productDetailsReducer from "../features/productDetails/productDetailsSlice"
import userReducer from "../features/user/userSlice"
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productDetailsReducer,
    user: userReducer,
    cart: cartReducer,
  },
})
