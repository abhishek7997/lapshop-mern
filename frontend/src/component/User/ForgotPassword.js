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
import MetaData from "react-helmet"
import {
  clearErrors,
  destroyState,
  forgotPassword,
} from "../../features/user/userSlice"
import "./ForgotPassword.css"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const [email, setEmail] = useState("")
  const { error, loading, message = null } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgotPassword({ email }))
    alert.success(message)
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (message) dispatch(destroyState("message"))
  }, [dispatch, alert, error, message])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="auth-container">
            <div className="auth-forgot-box">
              <form className="forgot-form" onSubmit={handleSubmit}>
                <h2>FORGOT PASSWORD</h2>
                <div className="forgot-email">
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <Button type="submit" variant="contained">
                  Send Reset Link
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ForgotPassword
