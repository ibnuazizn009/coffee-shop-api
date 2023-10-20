const express = require('express');
const router = express.Router();
const {createCategory, getCategory, getCategorybyId, updateCategory, deleteCategory} = require('../controllers/category-controller');
const middlewares = require('../middlewares');

router.get('/categories', getCategory);
router.get('/category/:id', getCategorybyId);
router.post('/category/add-category', middlewares.verify_sign.verifyToken, createCategory);
router.put('/category/update-category/:id', middlewares.verify_sign.verifyToken, updateCategory);
router.delete('/category/:id', middlewares.verify_sign.verifyToken, deleteCategory);

module.exports = {
    routes: router
}
