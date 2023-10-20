const express = require('express');
const router = express.Router();
const { createProduct, getProduct, getProductbyId, updateProduct, deleteProduct } = require('../controllers/product-controller');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime()+ '-' +file.originalname);
    }
});

const filterFile = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }else{
        cb(new Error('Filetype does not supported'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 548576
    },
    fileFilter: filterFile
});

router.get('/products', getProduct)
router.post('/product/add-product', upload.single('productImage'), createProduct);
router.get('/product/:id', getProductbyId);
router.put('/product/update-product/:id', updateProduct);
router.delete('/product/delete-product/:id', deleteProduct);

module.exports = {
    routes: router
}