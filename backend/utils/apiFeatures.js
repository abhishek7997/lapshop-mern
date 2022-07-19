class ApiFeatures {
  constructor(query, queryString) {
    // example: await Product.find({name:"samosa"}) // This is a 'query'
    this.query = query
    this.queryString = queryString
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // make our searching case-insensitive
          },
        }
      : {} // passing empty {} in mongodb.find() gets list of all products
    this.query = this.query.find({ ...keyword })
    return this
  }

  filter() {
    // Filter by category
    const queryString = { ...this.queryString } // we copy in this manner, because objects are passed by reference, when directly using assignment= operator

    // Removing all fields except 'category'
    const removeFields = ["keyword", "page", "limit"]
    removeFields.forEach((key) => delete queryString[key])
    // console.log("Filter: ", queryString)

    /*
    before: queryCopy <= { keyword: 'hp', category: 'laptop' }
    after: queryCopy <= { category: 'laptop' }
    */

    // Filter for price and rating
    /*
    http://localhost:4000/api/v1/products?price[lt]=27000&price[gt]=5000
    We get filter:  { price: { lt: '27000', gt: '5000' } },
    we need to add $ before lt, gt so that we can use it in mongodb
    */

    let queryStr = JSON.stringify(queryString)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`) // lt -> $lt, lte -> $lte
    this.query = this.query.find(JSON.parse(queryStr))
    console.log(queryStr)
    return this
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1 // passed from the query url
    // products to display = total number of products//products per page
    const skip = resultsPerPage * (currentPage - 1)
    this.query = this.query.limit(resultsPerPage).skip(skip)
    return this
  }
}

module.exports = ApiFeatures
