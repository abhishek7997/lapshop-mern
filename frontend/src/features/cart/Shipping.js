import React, { useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, NavLink } from "react-router-dom"
import { Country, State } from "country-state-city"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import PinDropIcon from "@mui/icons-material/PinDrop"
import PhoneIcon from "@mui/icons-material/Phone"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Metadata from "../../component/layout/Metadata"
import "./Shipping.css"
import ShippingSteps from "./ShippingSteps"
import { saveShippingInfo } from "./cartSlice"

const Shipping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { shippingInfo } = useSelector((state) => state.cart)
  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state ?? "")
  const [country, setCountry] = useState(shippingInfo.country ?? "")
  const [pin, setPIN] = useState(shippingInfo.pin)
  const [phone, setPhone] = useState(shippingInfo.phone)

  const submitHandler = (e) => {
    e.preventDefault()
    if (phone.length !== 10) {
      alert.error("Phone number must be of 10 digits")
      return
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pin,
        phone,
      })
    )
  }

  return (
    <>
      <ShippingSteps activeStep={0}></ShippingSteps>
      <Metadata title="Shipping Details"></Metadata>
      <div className="shipping-container">
        <div className="shipping-box">
          <h2 className="shipping-heading">Shipping details</h2>

          <form
            className="shipping-form"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <div className="address">
              <FormControl fullWidth>
                <TextField
                  required
                  id="address"
                  label="Address"
                  value={address}
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>

            <div className="city">
              <FormControl fullWidth>
                <TextField
                  required
                  id="city"
                  label="City"
                  value={city}
                  variant="outlined"
                  onChange={(e) => setCity(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>

            <div className="pin">
              <FormControl fullWidth>
                <TextField
                  required
                  id="pin"
                  label="PIN code"
                  value={pin}
                  variant="outlined"
                  onChange={(e) => setPIN(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PinDropIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>

            <div className="phone">
              <FormControl fullWidth>
                <TextField
                  required
                  id="phone"
                  type={"number"}
                  label="Phone number"
                  value={phone}
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>

            <div className="country">
              <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Select
                  required
                  labelId="country"
                  id="country"
                  value={country}
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {Country &&
                    Country.getAllCountries().map((item) => {
                      return (
                        <MenuItem value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </div>

            {country && country !== "" && (
              <div className="state">
                <FormControl fullWidth>
                  <InputLabel id="state">State</InputLabel>
                  <Select
                    required
                    labelId="state"
                    id="state"
                    value={state}
                    label="State"
                    onChange={(e) => setState(e.target.value)}
                  >
                    {State &&
                      State.getStatesOfCountry(country).map((item) => {
                        return (
                          <MenuItem value={item.isoCode} key={item.isoCode}>
                            {item.name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </div>
            )}

            <NavLink to="/order/confirm">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ padding: "0.8rem 1.3rem" }}
              >
                Continue
              </Button>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  )
}

export default Shipping
