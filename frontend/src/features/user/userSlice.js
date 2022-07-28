import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  loginUserAPI,
  registerUserAPI,
  loadUserAPI,
  logoutUserAPI,
  updateUserAPI,
  updatePasswordAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
} from "./userAPI"

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (params, { rejectWithValue }) => {
    const { loginEmail, loginPassword } = params
    try {
      const { data } = await loginUserAPI(loginEmail, loginPassword)
      if (data.success === false) {
        throw data.message
      }

      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (params, { rejectWithValue }) => {
    const { registerName, registerEmail, registerPassword } = params
    try {
      const { data } = await registerUserAPI(
        registerName,
        registerEmail,
        registerPassword
      )
      if (data.success === false) {
        throw data.message
      }
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await loadUserAPI()
      if (data.success === false) {
        throw data.message
      }
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await logoutUserAPI()
      if (data.success === false) {
        throw data.message
      }
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await updateUserAPI(userData)
      if (data.success === false) {
        throw Error("Could not update profile")
      }
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await updatePasswordAPI(params)
      if (data.success === false) {
        throw data.message
      }
      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (params, { rejectWithValue }) => {
    const { email } = params
    try {
      const { data } = await forgotPasswordAPI(email)
      if (data.success === false) {
        throw data.message
      }

      return data
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await resetPasswordAPI(params)
      if (data.success === false) {
        throw data.message
      }
      return data.success
    } catch (err) {
      throw rejectWithValue(err)
    }
  }
)

export const userSlice = createSlice({
  name: "user",
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
    [loginUser.pending]: (state) => {
      state.loading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    [registerUser.pending]: (state) => {
      state.loading = true
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    [loadUser.pending]: (state) => {
      state.loading = true
    },
    [loadUser.fulfilled]: (state, action) => {
      state.loading = false
      if (action.payload) {
        state.user = action.payload
        state.isAuthenticated = true
      } else {
        state.user = null
        state.isAuthenticated = false
      }
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    [logoutUser.pending]: (state) => {
      state.loading = true
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = null
    },
    [logoutUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [updateUser.pending]: (state) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      // state.user = action.payload
      state.error = null
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [updatePassword.pending]: (state) => {
      state.loading = true
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.isUpdated = true
    },
    [updatePassword.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isUpdated = null
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.isUpdated = true
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isUpdated = null
    },
    [resetPassword.pending]: (state) => {
      state.loading = true
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = null
    },
  },
})

export const { clearErrors, destroyState } = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer
