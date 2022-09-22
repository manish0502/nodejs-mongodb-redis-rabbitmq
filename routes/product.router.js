const express = require('express')

const router = express.Router()

const {
  createJob,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
} = require('../controllers/product.controller')

router.route('/')
        .post(createJob)
        .get(getAllProducts)

router.route('/:id')
            .get(getProduct)
            .delete(deleteProduct)
            .patch(updateProduct)

module.exports = router
