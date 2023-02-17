import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer"
import "./App.css"
import Home from "./component/Home/Home"
import ProductDetails from "./features/productDetails/ProductDetails.js"
import ProductsList from "./features/productsList/ProductsList"
import Search from "./component/Product/Search.js"
import Auth from "./component/User/Auth"
import { useSelector, useDispatch } from "react-redux"
import {
  loginUser,
  registerUser,
  loadUser,
  clearErrors,
} from "./features/user/userSlice"
import ProtectedRoute from "./component/Route/ProtectedRoute"
import Profile from "./component/User/Profile"
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./features/cart/Cart"
import Shipping from "./features/cart/Shipping"
import ConfirmOrder from "./features/cart/ConfirmOrder"
import Dashboard from "./component/Admin/Dashboard.js"
import AdminProductsList from "./component/Admin/AdminProductsList"
import NewProduct from "./component/Admin/NewProduct"
import UsersList from "./component/Admin/UsersList"

const Contact = () => {
  return <div>Contact</div>
}

const About = () => {
  return <div>About</div>
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <Router basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact></Route>
        <Route
          path="/products/product/:id"
          element={<ProductDetails />}
        ></Route>
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:keyword" element={<ProductsList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/login" element={<Auth />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product/new"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
