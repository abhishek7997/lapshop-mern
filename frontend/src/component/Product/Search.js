import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Search.css"

const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate("/products")
    }
  }

  return (
    <>
      <form className="search-box" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <input type="submit" value="Search"></input>
      </form>
    </>
  )
}

export default Search
