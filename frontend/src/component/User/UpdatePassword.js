import React, { useState, useEffect, useRef } from "react"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import Loader from "../../component/layout/Loader/Loader"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { useAlert } from "react-alert"
import Button from "@mui/material/Button"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  clearErrors,
  destroyState,
  loadUser,
  updatePassword,
} from "../../features/user/userSlice"
import "./UpdatePassword.css"

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  })
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {
    error,
    loading,
    isAuthenticated,
    isUpdated = null,
  } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success("Password updated successfully")
      dispatch(destroyState("isUpdated"))
      navigate("/account")
    }
  }, [alert, isAuthenticated, error, isUpdated])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }))
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="auth-container">
            <div className="auth-update-box">
              <form className="update-form" onSubmit={handleSubmit}>
                <h2>UPDATE PASSWORD</h2>
                <div className="update-password">
                  <TextField
                    id="old-password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => setOldPassword(e.target.value)}
                    name="old-password"
                    label="Old Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            tabIndex={-1}
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="update-password">
                  <TextField
                    id="new-password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    name="password"
                    label="New Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex={-1}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="update-password">
                  <TextField
                    id="confirm-password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="password"
                    label="Confirm Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex={-1}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <Button type="submit" variant="contained" disabled={loading}>
                  Update
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpdatePassword
