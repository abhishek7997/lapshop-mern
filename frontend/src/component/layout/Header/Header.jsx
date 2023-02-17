import { useState } from "react"
import "./Header.css"
import { Route, Routes, NavLink, useNavigate } from "react-router-dom"
import { FaShoppingCart, FaUserAlt, FaSearch } from "react-icons/fa"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { FiLogIn, FiLogOut } from "react-icons/fi"
import { RiDashboardFill } from "react-icons/ri"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import Home from "../../Home/Home"
import { logoutUser } from "../../../features/user/userSlice"

const Header = () => {
  return (
    <>
      <Navbar />
    </>
  )
}

export default Header

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  )

  const { cartItems } = useSelector((state) => state.cart)

  const [menuOpen, setMenuOpen] = useState(false)
  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    if (!error) {
      alert.success("Logged out successfully")
    }
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          LapShop
        </NavLink>
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleClick}
            >
              Product
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleClick}
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={handleClick}
            >
              About
            </NavLink>
          </li> */}
          <div className="user-actions">
            <Tooltip title="Search">
              <NavLink to="/search" style={{ color: "white" }}>
                <FaSearch />
              </NavLink>
            </Tooltip>
            <Tooltip title="View cart">
              <Badge
                color="primary"
                badgeContent={cartItems && cartItems.length}
              >
                <NavLink to="/cart" style={{ color: "white" }}>
                  <FaShoppingCart />
                </NavLink>
              </Badge>
            </Tooltip>
            {!loading &&
              (!isAuthenticated ? (
                <Tooltip title="Login">
                  <NavLink to="/login" style={{ color: "white" }}>
                    <FiLogIn />
                  </NavLink>
                </Tooltip>
              ) : (
                <>
                  {user && user.user
                    ? user.user.role === "admin" && (
                        <Tooltip title="Dashboard">
                          <NavLink
                            to="/admin/dashboard"
                            style={{ color: "white" }}
                          >
                            <RiDashboardFill />
                          </NavLink>
                        </Tooltip>
                      )
                    : null}
                  <Tooltip title="View Profile">
                    <NavLink to="/account" style={{ color: "white" }}>
                      <FaUserAlt />
                    </NavLink>
                  </Tooltip>
                  <Tooltip title="Logout" onClick={handleLogout}>
                    <IconButton style={{ color: "white" }}>
                      <FiLogOut />
                    </IconButton>
                  </Tooltip>
                </>
              ))}
          </div>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {!menuOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
        </div>
      </div>
    </nav>
  )
}
