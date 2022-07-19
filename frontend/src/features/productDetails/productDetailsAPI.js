import axios from "axios"

const fetchProductDetails = async (product_id) => {
  try {
    const response = await axios.get(`/api/v1/product/${product_id}`)
    return { status: response.status, data: response.data }
  } catch (err) {
    return { status: err.status, error: err.message }
  }
}

export default fetchProductDetails
