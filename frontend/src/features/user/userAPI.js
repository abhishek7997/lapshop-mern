import axios from "axios"

export const loginUserAPI = async (email, password) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } }
    const response = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      config
    )
    return response
  } catch (err) {
    return err.response
  }
}

export const registerUserAPI = async (name, email, password) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } }
    const response = await axios.post(
      "/api/v1/register",
      {
        name,
        email,
        password,
      },
      config
    )
    return response
  } catch (err) {
    return err.response
  }
}

export const loadUserAPI = async () => {
  try {
    const response = await axios.get("/api/v1/profile")
    return response
  } catch (err) {
    return err.response
  }
}

export const logoutUserAPI = async () => {
  try {
    const response = await axios.get("/api/v1/logout")
    return response
  } catch (err) {
    return err.response
  }
}

export const updateUserAPI = async (userData) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } }
    const response = await axios.put(
      "/api/v1/profile/update",
      {
        ...userData,
      },
      config
    )
    return response
  } catch (err) {
    return err.response
  }
}

export const updatePasswordAPI = async (params) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = params
    const config = { headers: { "Content-Type": "application/json" } }
    console.log("Update User: ", params)
    const response = await axios.put(
      "/api/v1/password/update",
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      config
    )
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    return err.response
  }
}

export const forgotPasswordAPI = async (email) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } }
    const response = await axios.post(
      "/api/v1/password/forgot",
      {
        email,
      },
      config
    )
    console.log(response)
    return response
  } catch (err) {
    return err.response
  }
}

export const resetPasswordAPI = async (params) => {
  try {
    const { token, password, confirmPassword } = params
    const config = { headers: { "Content-Type": "application/json" } }
    console.log("Reset Password API: ", params)
    const response = await axios.put(
      `/api/v1/password/reset/${token}`,
      {
        password,
        confirmPassword,
      },
      config
    )
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    return err.response
  }
}

export const getAllUsersAPI = async () => {
  try {
    const response = await axios.get("/api/v1/admin/users")
    console.log("All users: ", response)
    return response
  } catch (err) {
    console.log(err)
    return err.response
  }
}
