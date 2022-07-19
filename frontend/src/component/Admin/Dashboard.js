import React from "react"
import { NavLink, Link } from "react-router-dom"
import { Typography } from "@mui/material"
import Sidebar from "./Sidebar.js"
import "./Dashboard.css"

const Dashboard = () => {
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
              <p>4</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
