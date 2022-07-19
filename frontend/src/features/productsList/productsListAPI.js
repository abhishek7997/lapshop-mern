import axios from "axios"

export const fetchProducts = async (
  keyword = "",
  currentPage = 1,
  price = null
) => {
  try {
    let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}`
    if (price) {
      url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
    }
    const response = await axios.get(url)
    return { status: response.status, data: response.data }
  } catch (err) {
    return { status: err.status, error: err.message }
  }
}

export const fetchProductsPaginated = async (page) => {
  try {
    const response = await axios.get("/api/v1/products")
    return { status: response.status, data: response.data }
  } catch (err) {
    return { status: err.status, error: err.message }
  }
}

export const fetchProductsAdmin = async () => {
  try {
    const response = await axios.get("/api/v1/admin/products")
    return response
  } catch (err) {
    return err.message
  }
}

export const createProductAPI = async (params) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    const response = await axios.put(
      "/api/v1/admin/product/new",
      params,
      config
    )
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
    return err.message
  }
}

/*
{
    "message": "Request failed with status code 504",
    "name": "AxiosError",
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {
            "FormData": null
        },
        "headers": {
            "Accept": "application/json, text/plain, /*"
        },
        "method": "get",
        "url": "/api/v1/products"
    },
    "code": "ERR_BAD_RESPONSE",
    "status": 504
}
*/
