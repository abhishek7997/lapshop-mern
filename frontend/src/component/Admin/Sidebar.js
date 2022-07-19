import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AddIcon from "@mui/icons-material/Add"
import PostAddIcon from "@mui/icons-material/PostAdd"
import PeopleIcon from "@mui/icons-material/People"
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
          <PostAddIcon /> All products
        </p>
      </Link>
      <Link to="/admin/product/new">
        <p>
          <AddIcon /> Add Product
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
    </div>
  )
}

export default Sidebar
