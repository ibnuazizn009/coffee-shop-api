const express = require('express');
const router = express.Router();
const middleware = require('../middlewares');
const { createUser, getUser, getUserbyId, updateUser, deleteUser, userSignIn } = require('../controllers/user-controller');

router.get('/users', getUser);
router.get('/user/:id', getUserbyId);
router.post('/user/add-user', middleware.verify_register.verifyRegister, createUser);
router.put('/user/update-user/:id', middleware.verify_register.verifyRegister, updateUser);
router.delete('/user/delete-user/:id', deleteUser);
router.post('/login', userSignIn);


module.exports = {
    routes: router
}