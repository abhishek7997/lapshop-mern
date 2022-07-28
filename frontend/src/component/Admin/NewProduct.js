import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Loader from "../../component/layout/Loader/Loader"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import DescriptionIcon from "@mui/icons-material/Description"
import StorageIcon from "@mui/icons-material/Storage"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import {
  clearErrors,
  destroyState,
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
    products = null,
  } = useSelector((state) => state.products)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState("")
  const [files, setFiles] = useState([])
  const [category, setCategory] = React.useState()
  const [url, setUrl] = useState(
    "https://via.placeholder.com/640x480.png?text=Not%20Available"
  )
  const [image, setImage] = useState("")
  const imgRef = useRef()

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        name,
        price,
        description,
        stock,
        category,
        images: {
          public_id: uuidv4(),
          url: "https://via.placeholder.com/640x480.png?text=Not%20Available",
        },
      })
    )
  }

  const handleFileUpload = async (base64) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json, image/jpeg",
          //"Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      }
      const url = `https://freeimage.host/api/1/upload/?key=${process.env.REACT_APP_API_KEY}&source=${base64}&format=json`
      const response = axios.post(url, {}, config)
      // console.log(response.image)
      return response
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (products.product) {
      alert.success("Product created successfully")
      dispatch(destroyState("product"))
      navigate("/admin/dashboard")
    }
  }, [dispatch, alert, products, error])

  function getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    // Set width and height
    canvas.width = img.width
    canvas.height = img.height
    // Draw the image
    ctx.drawImage(img, 0, 0)
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
              <InputLabel id="category">Category</InputLabel>
              <Select
                required
                labelId="category"
                id="category-select"
                value={category}
                style={textFieldStyle}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"Gaming"}>Gaming</MenuItem>
                <MenuItem value={"Normal"}>Normal</MenuItem>
              </Select>
            </div>
            <div>
              <Button variant="contained" component="label">
                Upload Image
                <input
                  id="image"
                  name="image"
                  type="button"
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
                  // onLoad={(e) => {
                  //   console.log(e)
                  // }}
                  onLoad={async (e) => {
                    getDataUrl(e.target)
                    await handleFileUpload(getDataUrl(e.target))
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
