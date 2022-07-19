import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllProducts, clearErrors } from "./productsListSlice"
import ProductCard from "../../component/Home/ProductCard"
import Loader from "../../component/layout/Loader/Loader"
import { useParams } from "react-router-dom"
import { useAlert } from "react-alert"
import Pagination from "@mui/material/Pagination"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import MetaData from "react-helmet"
import "./ProductsList.css"

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Smartphones",
]

const ProductsList = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { products, loading, error, productsCount, filteredProductsCount } =
    useSelector((state) => state.products)

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 4194304])
  // const [category, setCategory] = useState("")

  // const priceHandler = (e, new_price) => setPrice(new_price)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getAllProducts({ keyword, currentPage, price }))
  }, [dispatch, error, alert, currentPage, price])

  let count = filteredProductsCount

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p> {error} </p>
      ) : (
        <>
          <MetaData title="Products -- LapShop"></MetaData>
          <h2 className="products-heading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard product={product} key={product._id} />
              })}
          </div>
          {/* <div className="filter-slider">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={4194304}
              step={10}
            ></Slider>
          </div> */}

          {/* <div>
            <Typography>Categories</Typography>
            <ul className="category-box">
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                )
              })}
            </ul>
          </div> */}

          {/* Ratings filter */}

          <div className="pagination">
            {productsCount >= 8 && (
              <Pagination
                count={Math.ceil(filteredProductsCount / 8)}
                color="primary"
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
              />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default ProductsList
