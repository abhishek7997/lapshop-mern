import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { DataGrid } from "@mui/x-data-grid"
import {
  getAllUsers,
  clearErrors,
  destroyState,
} from "../../features/user/usersListSlice"
import Metadata from "../layout/Metadata"
import Sidebar from "./Sidebar"
import "./UsersList.css"

const UsersList = () => {
  const dispatch = useDispatch()
  const { loading, error, users = null } = useSelector((state) => state.users)

  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }
    dispatch(getAllUsers())
  }, [dispatch])

  const rows = []
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
    },
    // {
    //   field: "action",
    //   headerName: "Actions",
    //   type: "number",
    //   minWidth: 150,
    //   flex: 0.3,
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
    //           <EditIcon
    //             style={{ color: "rgb(17, 156, 255)", marginRight: "1rem" }}
    //           />
    //         </Link> */}
    //         {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
    //           <DeleteIcon style={{ color: "rgb(17, 156, 255)" }} />
    //         </Link> */}
    //       </>
    //     )
    //   },
    // },
  ]

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      })
    })

  return (
    <>
      <Metadata title="Users list" />
      <div className="dashboard">
        <Sidebar />
        <div className="users-list">
          <h1 className="products-heading">Users</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="products-table"
            autoHeight
          />
        </div>
      </div>
    </>
  )
}

export default UsersList
