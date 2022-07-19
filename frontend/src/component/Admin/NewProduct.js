import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Loader from "../../component/layout/Loader/Loader"
import Button from "@mui/material/Button"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import DescriptionIcon from "@mui/icons-material/Description"
import StorageIcon from "@mui/icons-material/Storage"
import axios from "axios"
import {
  clearErrors,
  createProduct,
} from "../../features/productsList/productsListSlice"
import Metadata from "../layout/Metadata"
import Sidebar from "./Sidebar"
import "./NewProduct.css"

const textFieldStyle = {
  width: "150%",
}

const NewProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const {
    loading,
    error,
    success,
    product = null,
  } = useSelector((state) => state.products)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState("")
  const [files, setFiles] = useState([])
  const [url, setUrl] = useState("")
  const [image, setImage] = useState("")
  const imgRef = useRef()

  const handleSubmit = () => {
    dispatch(
      createProduct({
        name,
        price,
        description,
        stock,
        image,
      })
    )
  }
  // const handleFileUpload = async (url) => {}

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (product) {
      alert.success("Product created successfully")
      navigate("/admin/dashboard")
    }
  }, [dispatch, alert, error])

  function getDataUrl(img) {
    // Create canvas
    console.log(img)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    // Set width and height
    canvas.width = img.width
    canvas.height = img.height
    // Draw the image
    ctx.drawImage(img, 0, 0)
    // console.log(canvas.toDataURL("image/jpeg"))
    return canvas.toDataURL("image/jpeg")
  }

  const loadFile = async function (event) {
    imgRef.current.src = URL.createObjectURL(event.target.files[0])
    setImage(getDataUrl(imgRef.current))
  }

  return (
    <>
      <Metadata title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="new-product-container">
          <h1 className="product-heading">Create Product</h1>
          <form
            className="product-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="product-name">
              <TextField
                id="name"
                label="Product name"
                variant="outlined"
                name="name"
                required
                style={textFieldStyle}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpellcheckIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="product-price">
              <TextField
                id="price"
                label="Price Per Unit (Rs.)"
                variant="outlined"
                type="number"
                name="price"
                required
                style={textFieldStyle}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="product-description">
              <TextField
                id="description"
                label="Product description"
                variant="outlined"
                name="description"
                multiline
                rows={4}
                required
                style={textFieldStyle}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="product-stock">
              <TextField
                id="stock"
                label="Available units"
                variant="outlined"
                type="number"
                required
                name="stock"
                style={textFieldStyle}
                onChange={(e) => {
                  setStock(e.target.value)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StorageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <Button variant="contained" component="label">
                Upload Image
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  hidden
                  required
                  onChange={loadFile}
                />
              </Button>
              <div>
                <img
                  id="output"
                  src={url}
                  ref={imgRef}
                  style={{
                    maxWidth: "256px",
                    margin: "1rem auto",
                    border: "2px solid rgba(0,0,0,0.5)",
                  }}
                />
              </div>
            </div>
            <Button type="submit" variant="contained" style={{ width: "25%" }}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewProduct
