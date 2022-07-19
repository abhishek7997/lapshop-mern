import React, { useState } from "react"
import "./Cart.css"
import { Link } from "react-router-dom"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "./cartSlice"
import { useEffect } from "react"

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems = null, total = 0 } = useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.user)
  const checkoutHandle = () => {
    if (isAuthenticated) navigate("/shipping")
    else navigate("/login?redirect=shipping")
  }

  return (
    <>
      <div className="cart-page">
        <div className="cart-header">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => {
            return <CartItem item={item} key={item.id} />
          })
        ) : (
          <p>No items in cart</p>
        )}
        {cartItems.length > 0 && (
          <div className="cart-gross-profit">
            <div></div>
            <div className="cart-gross-profit-box">
              <p>Gross total</p>
              <p>{`₹${total}`}</p>
            </div>
            <div></div>
            <div className="checkout">
              <Button
                onClick={checkoutHandle}
                variant="contained"
                style={{
                  backgroundColor: "rgb(17, 156, 255)",
                  color: "white",
                  border: "none",
                  padding: "0.8vmax 4vmax",
                  borderRadius: "30px",
                }}
              >
                Check out
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(item.quantity ?? 1)
  const handleChange = (e) => {
    setQuantity(e.target.value)
  }

  useEffect(() => {
    dispatch(addToCart({ id: item._id, quantity: quantity }))
  }, [quantity])

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

  return (
    <div className="cart-container">
      <CartItemCard item={item} key={`${item._id}-item`} />
      <div className="cart-input">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quantity}
          label="Quantity"
          onChange={handleChange}
        >
          {getMenuItems(item.stock).map((i) => {
            return i
          })}
        </Select>
      </div>
      <div className="cart-subtotal">{`₹ ${item.price * quantity}`}</div>
    </div>
  )
}

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch()
  const handleRemove = (e) => {
    dispatch(removeFromCart({ id: item._id }))
  }

  return (
    <div className="cart-item-card">
      <img src={item.image} alt={`${item.name}-image`} />
      <div>
        <Link to={`/product/${item._id}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={handleRemove}>Remove</p>
      </div>
    </div>
  )
}

export default Cart
