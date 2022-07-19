import React from "react"
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  }

  return (
    <Link className="product-card" to={`/products/product/${product._id}`}>
      <img
        src={product.images[0].url}
        alt={product.name}
        onError={(event) => {
          event.target.src = "https://via.placeholder.com/150?text=Not%20Found"
          event.onerror = null
        }}
      />
      <p>{product.name.substring(0, 40) + "..."}</p>
      <div>
        <ReactStars {...options} />
        <span>{product.numOfReviews} reviews</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  )
}

export default ProductCard
