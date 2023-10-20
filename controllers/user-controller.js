const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');
const { makeid } = require('../config/make-id');
dotenv.config();

module.exports = {
    userSignIn: async(req, res, next) => {
        const { email, password } = req.body;
        try {
            const result = await User.findOne({
                where: {
                    email: email
                }
            })

            if(!result){
                return res.status(404).json({
                    status: false,
                    message: 'Username or password incorrect!'
                })
            }

            const validPassword = bcrypt.compareSync(password, result.dataValues.password);
            if(!validPassword){
                return res.status(401).json({
                    success: false,
                    message: 'Invalid password',
                    data: {}
                });
            }

            const token = 'Bearer ' + jwt.sign({
                userId: result.dataValues.id,
            }, process.env.SECRET_JWT, {
                expiresIn: '7d'
            });

            let token_split = token.split(' ')[1];
            await User.update({
                token: token_split
            }, {
                where: {
                    id: result.dataValues.id,
                }
            })

            res.status(200).json({
                success: true,
                message: 'Successfully login',
                data: {
                    user: {
                        "userId": result.dataValues.id,
                        "username": result.dataValues.Username
                    },
                    accessToken: token
                }
            });
        } catch (error) {
            console.log(`error while login user`, error);
            res.status(400).json(error);
        }
    },

    createUser: async(req, res, next) => {
        const { fullname, username, email, password } = req.body;
        const userdata = await User.findAll();
        try {
            if(!userdata.length){
                bcrypt.hash(password, 10, async(err, hash) => {
                    if(err){
                        return res.status(500).json({
                            success: false,
                            message: err,
                        });
                    }else{
                        const result = await User.create({
                            id: `USR${makeid(8)}`,
                            fullname,
                            username,
                            email,
                            password: hash,
                            isActive: true,
                        })

                        return res.status(201).json({
                            status: true,
                            message: 'Created successfully',
                            data: result
                        }); 
                    }
                })
            }else{
                
                for (let i = 0; i < userdata.length; i++) {
                    const element = userdata[i].dataValues.email;
                    if(element === email){
                        return res.status(400).json({
                            success: false,
                            message: 'Username already exist'
                        })
                    }
                }
        
                bcrypt.hash(password, 10, async(err, hash) => {
                    if(err){
                        return res.status(500).json({
                            success: false,
                            message: err,
                        });
                    }else{
                        const result = await User.create({
                            id: `USR${makeid(8)}`,
                            fullname,
                            username,
                            email,
                            password: hash,
                            isActive: true
                            
                        })

                        return res.status(201).json({
                            status: true,
                            message: 'Created successfully',
                            data: result
                        }); 
                    }
                })
            }
            
        } catch (error) {
            console.log(`error while creating user`, error);
            res.status(400).json(error);
        }
    },

    getUser: async(req, res, next) => {
        try {
            const result = await User.findAll();

            if(!result.length){
                return res.status(404).json({
                    status: false,
                    message: 'User not found',
                    data: {}
                })
            }

            res.status(200).json({
                status: true,
                message: 'User has been found',
                data: result
            })
        } catch (error) {
            console.log(`error while getting user`, error);
            res.status(400).json(error);
        }
    },

    getUserbyId: async(req, res, next) => {
        const { id } = req.params;

        try {
            const result = await User.findByPk(id);
            if(!result){
                return res.status(404).json({
                    status: false,
                    message: `User with id ${id} not found`,
                    data: {}
                })
            }

            res.status(200).json({
                status: true,
                message: 'Product has been found',
                data: result
            })
        } catch (error) {
            console.log(`error while getting user id`, error);
            res.status(400).json(error);
        }
    },

    updateUser: async(req, res, next) => {
        const { id } = req.params;
        const { fullname, username, email, password, isActive } = req.body; 
        const userdata = await User.findByPk(id);
        try {
            if(userdata){
                bcrypt.hash(password, 10, async(err, hash) => {
                    if(err){
                        return res.status(500).json({
                            success: false,
                            message: err,
                        });
                    }else{
                        const result = await User.update({
                            fullname,
                            username,
                            email,
                            password: hash,
                            isActive
                        }, { where: {id} }) 

                        if(Number(result) === 1){
                            return res.status(200).json({
                                status: true,
                                message: 'Update successfully!!',
                                data: {
                                    updatedId: id,
                                    affectedRow: result
                                }
                            })
                        }else{
                            return res.status(404).json({
                                status: true,
                                message: 'Update unsuccessfully!!',
                                data: {}
                            })
                        }
                    }
                })
            }else{
                return res.status(404).json({
                    status: false,
                    message: `User with id ${id} not found`,
                    data: {}
                })
            }
        } catch (error) {
            console.log(`error while updating user id`, error);
            res.status(400).json(error);
        }
    },
    
    deleteUser: async(req, res, next) => {
        const { id } = req.params;
        const userid = await User.findByPk(id);
        try {
            if(userid){
                const result = await User.destroy({
                    where: {
                        id
                    }
                })
                if(result){
                    return res.status(200).json({
                        status: true,
                        message: 'Delete successfully',
                        data: {
                            deletedId: id,
                            affectedRow: result
                        }
                    })
                }else{
                    return res.status(400).json({
                        status: true,
                        message: 'Error deleted',
                    })
                }
            }else{
                return res.status(404).json({
                    status: false,
                    message: `User with id ${id} not found`,
                    data: {}
                })
            }
        } catch (error) {
            console.log(`error while deleting user`, error);
            res.status(400).json(error);
        }
    }
}

