import React, { useEffect } from "react"
import MetaData from "react-helmet"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../layout/Loader/Loader"
import "./Profile.css"

const Profile = () => {
  const navigate = useNavigate()
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.user.name} 's Profile`} />
          <div className="profile-container">
            <div>
              <h1>Profile</h1>
              <Link to="/profile/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.user.email}</p>
              </div>
              <div>
                <h4>Joined on</h4>
                <p>{String(user.user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Profile
