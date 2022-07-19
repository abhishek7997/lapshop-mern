import React from "react"
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import Metadata from "../layout/Metadata"
import ProductsList from "../../features/productsList/ProductsList"

const Home = () => {
  return (
    <>
      <Metadata title="LapShop" />
      <div className="banner">
        <p>Welcome to LapShop !</p>
        <h1>Get good laptops</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="home-heading" id="container">
        Featured Products
      </h2>
      {/* <div className="container"> */}
      <ProductsList />
      {/* </div> */}
    </>
  )
}

export default Home
