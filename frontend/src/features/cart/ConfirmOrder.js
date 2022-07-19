import { Typography } from "@mui/material"
import Button from "@mui/material/Button"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Metadata from "../../component/layout/Metadata"
import "./ConfirmOrder.css"
import ShippingSteps from "./ShippingSteps"

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  )
  const shippingCharges = subtotal > 1000 ? 0 : 200
  const tax = subtotal * 0.18
  const totalPrice = subtotal + tax + shippingCharges
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pin}, ${shippingInfo.country}`

  const proceedToPayment = () => {}

  return (
    <>
      <ShippingSteps activeStep={1}></ShippingSteps>
      <Metadata title="Confirm Order"></Metadata>
      <div className="confirm-order-page">
        <div>
          <div className="confirm-order-area">
            <Typography>Shipping Info</Typography>
            <div className="confirm-order-area-box">
              <div>
                <p>Name: </p>
                <span>{user.user.name}</span>
              </div>
              <div>
                <p>Phone: </p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirm-cart-items">
            <Typography>Your cart items: </Typography>
            <div className="confirm-cart-items-container">
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <div>
                      <img src={item.image} alt={`${item.name}-image`} />
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                      <span>
                        <b>{`₹${item.price} * ${item.quantity} = ₹${
                          item.price * item.quantity
                        }`}</b>
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div>
          <div className="order-summary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal: </p>
                <span>Rs. {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges: </p>
                <span>Rs. {shippingCharges}</span>
              </div>
              <div>
                <p>GST: </p>
                <span>Rs. {tax}</span>
              </div>
            </div>

            <div className="order-summary-total">
              <p>
                <b>Total: </b>
              </p>
              <span>Rs. {totalPrice}</span>
            </div>

            <Button
              type="submit"
              variant="contained"
              onClick={proceedToPayment}
            >
              Proceed To Payment (Not yet available)
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder
