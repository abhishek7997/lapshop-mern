import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import { Typography } from "@mui/material"
import Sidebar from "./Sidebar.js"
import {
  getAllUsers,
  clearErrors,
  destroyState,
} from "../../features/user/usersListSlice"
import "./Dashboard.css"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { loading, error, users = null } = useSelector((state) => state.users)

  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-container">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboard-summary">
          <div>
            {/* <p>
              Total Amount <br /> Rs. 2000
            </p> */}
          </div>
          <div className="dashboard-summary-box">
            <Link to="/admin/products">
              <p>Product</p>
              <p>50</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
