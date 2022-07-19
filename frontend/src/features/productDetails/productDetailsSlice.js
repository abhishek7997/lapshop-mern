import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import fetchProductDetails from "./productDetailsAPI"

const initialState = {
  product: {},
  loading: false,
  error: null,
}

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { status, data, error = null } = await fetchProductDetails(id)
      if (status !== 200) {
        throw error
      }
      return data.product
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const productDetailsSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    clearErrors: (state, action) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearErrors } = productDetailsSlice.actions

export const selectProduct = (state) => state.product

export default productDetailsSlice.reducer
