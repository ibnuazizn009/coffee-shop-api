const express = require('express');
const router = express.Router();
const { createProduct, getProduct, getProductbyId, updateProduct, deleteProduct } = require('../controllers/product-controller');

router.get('/products', getProduct)
router.post('/product/add-product', createProduct);
router.get('/product/:id', getProductbyId);
router.put('/product/update-product/:id', updateProduct);
router.delete('/product/delete-product/:id', deleteProduct);

module.exports = {
    routes: router
}