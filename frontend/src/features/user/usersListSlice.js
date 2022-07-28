import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsersAPI } from "./userAPI"

const initialState = {
  users: null,
  loading: false,
  error: null,
}

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllUsersAPI()
      console.log("All users slice: ", data)
      if (data.success === false) {
        throw data.message
      }
      return data.users
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const usersListSlice = createSlice({
  name: "users",
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
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.loading = true
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      console.log(action)
      state.users = action.payload
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearErrors, destroyState } = usersListSlice.actions

export const selectUsers = (state) => state.users

export default usersListSlice.reducer
