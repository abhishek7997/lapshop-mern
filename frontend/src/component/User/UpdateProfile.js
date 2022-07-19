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
  updateUser,
  clearErrors,
  loadUser,
} from "../../features/user/userSlice"
import "./UpdateProfile.css"

const UpdateProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (user) {
      setName(user.user.name)
      setEmail(user.user.email)
    }

    // if (isAuthenticated) {
    //   navigate("/account")
    // }
  }, [alert, isAuthenticated, error, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ name, email }))
    alert.success("Profile updated successfully")
    dispatch(loadUser())
    navigate("/account")
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="auth-container">
            <div className="auth-update-box">
              <form
                className="update-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <h2>UPDATE PROFILE</h2>
                <div className="update-name">
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="update-email">
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

export default UpdateProfile
