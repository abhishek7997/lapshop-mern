const express = require("express")
const {
  getAllProducts,
  getProductReviews,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAllProductsAdmin,
  createProductReview,
  deleteReview,
} = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router() // Used to create multiple routes, refer: https://www.geeksforgeeks.org/express-js-express-router-function/

// Router-level middlewares (almost similar to application-level middleware, except it is bound to an instance of express.Router())
// router.route(<mount-path>, (function to be called on this <mount-path>))
router.route("/products").get(getAllProducts)
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsAdmin)

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails) // a middleware sub-stack that handles GET requests to the /user/:id path
router.route("/review").put(isAuthenticatedUser, createProductReview)
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview)

module.exports = router
