const express = require('express');
const router = express.Router();
const {createCategory, getCategory, getCategorybyId, updateCategory, deleteCategory} = require('../controllers/category-controller');

router.get('/categories', getCategory);
router.get('/category/:id', getCategorybyId);
router.post('/category/add-category', createCategory);
router.put('/category/update-category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = {
    routes: router
}
