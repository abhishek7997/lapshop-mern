import React, { useState, useEffect } from "react"
import Carousel from "react-material-ui-carousel"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails, clearErrors } from "./productDetailsSlice"
import { addToCart } from "../cart/cartSlice"
import { useAlert } from "react-alert"
import { useParams } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import MetaData from "react-helmet"
import "./ProductDetails.css"
import Loader from "../../component/layout/Loader/Loader"
import ReviewCard from "./ReviewCard.js"

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { product, loading, error } = useSelector((state) => state.product)
  const [quantity, setQuantity] = useState(1)

  const handleChange = (event) => {
    setQuantity(event.target.value)
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getProductDetails(id))
  }, [dispatch, error, alert, id])

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings ?? 0,
    isHalf: true,
  }

  const getMenuItems = (stock) => {
    let items = []
    for (let i = 1; i <= Math.min(stock, 10); i++) {
      items.push(
        <MenuItem value={i} key={`qitem-${i}`}>
          {i}
        </MenuItem>
      )
    }
    return items
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ id, quantity }))
    alert.success("Item added to cart")
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name}`}></MetaData>
          <div className="product-details">
            <div>
              <Carousel className="carousel">
                {product.images &&
                  product.images.map((item, idx) => {
                    return (
                      <img
                        className="carousel-image"
                        key={item.url}
                        src={item.url}
                        alt={`${idx} slide`}
                      />
                    )
                  })}
              </Carousel>
            </div>
            <div>
              <div className="details-block-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="details-block-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="details-block-3">
                <h1>{`${product.price}`}</h1>
                <div className="details-block-3-1">
                  <div className="details-block-3-1-1">
                    <InputLabel id="demo-simple-select-label">
                      Quantity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={quantity}
                      label="Quantity"
                      onChange={handleChange}
                    >
                      {getMenuItems(product.stock).map((item) => {
                        return item
                      })}
                    </Select>
                  </div>
                  <button onClick={addToCartHandler}>Add to cart</button>
                </div>

                <p>
                  Status:
                  <b
                    className={product.stock < 1 ? "red-color" : "green-color"}
                  >
                    {product.stock < 1 ? "Out of stock" : "In stock"}
                  </b>
                </p>
              </div>

              <div className="details-block-4">
                Description: <p>{product.description}</p>
              </div>

              <button className="submit-review">Submit review</button>
            </div>
          </div>

          <h3 className="reviews-heading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet</p>
          )}
        </>
      )}
    </>
  )
}

export default ProductDetails
