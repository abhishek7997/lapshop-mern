import axios from "axios"

export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(`/api/v1/product/${id}`)
    return response
  } catch (err) {
    return err.response
  }
}

export const saveShippingInfoAPI = async () => {}
