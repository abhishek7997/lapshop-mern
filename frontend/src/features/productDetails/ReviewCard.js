import React from "react"
import ReactStars from "react-rating-stars-component"
import "./ReviewCard.css"

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  }

  const profile_png = "https://i.pravatar.cc/300"

  return (
    <div className="review-card">
      <img src={profile_png} alt="user" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
