const express = require('express');
const router = express.Router();
const {createCategory, getCategory} = require('../controllers/category-controller');

router.get('/categories', getCategory);
router.post('/add-category', createCategory);

module.exports = {
    routes: router
}
