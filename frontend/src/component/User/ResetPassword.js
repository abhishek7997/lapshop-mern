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
import { useNavigate, useParams } from "react-router-dom"
import {
  clearErrors,
  destroyState,
  loadUser,
  resetPassword,
} from "../../features/user/userSlice"
import "./ResetPassword.css"

const ResetPassword = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  })
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {
    error,
    loading,
    isAuthenticated,
    success = null,
  } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (success) {
      alert.success("Password reset successfully")
      dispatch(destroyState("success"))
      navigate("/login")
    }
  }, [alert, isAuthenticated, error, success])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword({ token, password, confirmPassword }))
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
            <div className="auth-reset-box">
              <form className="reset-form" onSubmit={handleSubmit}>
                <h2>RESET PASSWORD</h2>
                <div className="reset-password">
                  <TextField
                    id="new-password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
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

                <div className="reset-password">
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
                  reset
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ResetPassword
