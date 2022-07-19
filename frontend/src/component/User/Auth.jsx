import React, { useState, useEffect, useRef } from "react"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import OutlinedInput from "@mui/material/OutlinedInput"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import InputLabel from "@mui/material/InputLabel"
import Loader from "../../component/layout/Loader/Loader"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import Button from "@mui/material/Button"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  loginUser,
  registerUser,
  clearErrors,
} from "../../features/user/userSlice"
import "./Auth.css"

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const alert = useAlert()
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  })
  const { error, loading, isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isAuthenticated) {
      const obj = Object.fromEntries([...searchParams])
      if (obj["redirect"]) {
        navigate(`/${obj["redirect"]}`)
      } else navigate("/account")
    }
  }, [alert, isAuthenticated, error, searchParams])

  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)

  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shift-neutral")
      switcherTab.current.classList.remove("shift-right")
      registerTab.current.classList.remove("shift-neutral-form")
      loginTab.current.classList.remove("shift-left")
    }

    if (tab === "register") {
      switcherTab.current.classList.remove("shift-neutral")
      switcherTab.current.classList.add("shift-right")
      registerTab.current.classList.add("shift-neutral-form")
      loginTab.current.classList.add("shift-left")
    }
  }

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ loginEmail, loginPassword }))
  }

  const registerSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser({ registerName, registerEmail, registerPassword }))
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
            <div className="auth-signup-box">
              <div>
                <div className="auth-toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form
                className="login-form"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="login-email">
                  <TextField
                    id="login-email"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="login-password">
                  <TextField
                    id="login-password"
                    type={values.showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    label="Password"
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
                <Link to="/password/forgot">Forgot password ?</Link>
                {/* <input type="submit" value="Login" className="login-button"></input> */}
                <Button type="submit" variant="contained">
                  Login
                </Button>
              </form>

              <form
                className="signup-form"
                ref={registerTab}
                onSubmit={registerSubmit}
                encType="multipart/form-data"
              >
                <div className="signup-name">
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    onChange={(e) => setRegisterName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="signup-email">
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="signup-password">
                  <TextField
                    id="signup-password"
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    name="password"
                    label="Password"
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
                {/* <input type="submit" value="Login" className="login-button"></input> */}
                <Button type="submit" variant="contained">
                  Register
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Auth
