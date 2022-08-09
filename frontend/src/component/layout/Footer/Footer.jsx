import React from "react"
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="left-footer">Made using MERN Stack</div>
      <div className="middle-footer">
        <h1>LapShop</h1>
        <h2>Demo by M.Abhishek</h2>
        <p>Copyright {new Date(Date.now()).getFullYear()} &copy; M.Abhishek</p>
      </div>
      <div className="right-footer">
        <h4>Links</h4>
        <a href="https://github.com/abhishek7997/lapshop-mern">Github</a>
      </div>
    </footer>
  )
}

export default Footer
