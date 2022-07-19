import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import Metadata from "../layout/Metadata"
import Sidebar from "./Sidebar"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  clearErrors,
  getAllProductsAdmin,
} from "../../features/productsList/productsListSlice"
import "./AdminProductsList.css"

const AdminProductsList = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, products } = useSelector((state) => state.products)

  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }
    dispatch(getAllProductsAdmin())
  }, [dispatch])
  const rows = []
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 260,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon
                style={{ color: "rgb(17, 156, 255)", marginRight: "1rem" }}
              />
            </Link> */}
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <DeleteIcon style={{ color: "rgb(17, 156, 255)" }} />
            </Link>
          </>
        )
      },
    },
  ]

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      })
    })

  return (
    <>
      <Metadata title="Products List"></Metadata>
      <div className="dashboard">
        <Sidebar />
        <div className="admin-products">
          <h1 className="products-heading">Products</h1>
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

export default AdminProductsList
