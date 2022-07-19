import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../../component/layout/Loader/Loader"

const ProtectedRoute = ({ isAdmin = false, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user)
  return (
    <>
      {loading ? (
        <Loader />
      ) : !isAuthenticated || (isAdmin && user.user.role !== "admin") ? (
        <Navigate to="/login" />
      ) : (
        children
      )}
    </>
  )
}

export default ProtectedRoute
