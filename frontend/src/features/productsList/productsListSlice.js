import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  fetchProducts,
  fetchProductsPaginated,
  fetchProductsAdmin,
  createProductAPI,
} from "./productsListAPI"

const initialState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  filteredProductsCount: 0,
}

export const getAllProducts = createAsyncThunk(
  "products/fetchProducts",
  async (data) => {
    const {
      keyword = "",
      currentPage = 1,
      price = null,
      rejectWithValue,
    } = data
    try {
      const {
        status,
        data,
        error = null,
      } = await fetchProducts(keyword, currentPage, price)
      if (status !== 200) {
        throw error
      }
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const getProductsListPaginated = createAsyncThunk(
  "products/fetchProducts",
  async (page, { rejectWithValue }) => {
    try {
      const { status, data, error = null } = await fetchProductsPaginated(page)
      if (status !== 200) {
        throw error
      }
      return data.products
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const getAllProductsAdmin = createAsyncThunk(
  "products/fetchProductsAdmin",
  async () => {
    try {
      const { data } = await fetchProductsAdmin()
      console.log(data)
      if (data.success === false) {
        throw data.message
      }
      return data.products
    } catch (err) {
      console.log(err)
      throw "err"
    }
  }
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (params) => {
    try {
      const { data } = await createProductAPI(params)
      console.log(data)
      if (data.success === false) {
        throw data.message
      }
      return data.product
    } catch (err) {
      console.log(err)
      throw "err"
    }
  }
)

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    destroyState: (state, action) => {
      console.log(action)
      try {
        delete state[action.payload]
      } catch (_) {
        state[action.payload] = null
      }
    },
    clearErrors: (state, action) => {
      state.error = null
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.loading = true
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload.products
      state.productsCount = action.payload.productsCount
      state.filteredProductsCount = action.payload.filteredProductsCount
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [getProductsListPaginated.pending]: (state) => {
      state.loading = true
    },
    [getAllProductsAdmin.pending]: (state) => {
      state.loading = true
    },
    [getAllProductsAdmin.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    [getAllProductsAdmin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      console.log(action)
    },
    [createProduct.pending]: (state) => {
      state.loading = true
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.product = action.payload
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearErrors, destroyState } = productsSlice.actions

export const selectProducts = (state) => state.products

export default productsSlice.reducer
