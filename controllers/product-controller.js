const { Category, Product } = require('../models');
const { makeid } = require('../config/make-id');

module.exports = {
    createProduct: async(req, res, next) => {
        const { name, quantity, quality, description, categoryID } = req.body;
        const categoryid = await Category.findByPk(categoryID);

        try {
            if(!categoryid){
                return res.status(404).json({
                    status: false,
                    message: 'Category ID not found',
                    data: {}
                })
            }

            const result = await Product.create({
                id: `PRD${makeid(8)}`,
                name,
                quantity,
                quality,
                description,
                categoryID
            })

            res.status(200).json({
                status:true,
                message: 'Created successfull',
                data: result
           })
        } catch (error) {
            console.log(`error while creatng product`, error);
            res.status(400).json(error);
        }
    },

    getProduct: async(req, res, next) => {
        try {
            const result = await Product.findAll({
                include: 'category'
            });

            if(!result.length){
                return res.status(404).json({
                    status: false,
                    message: 'Product not found',
                    data: {}
                })
            }

            res.status(200).json({
                status: true,
                message: 'Product has been found',
                data: result
            })
        } catch (error) {
            console.log(`error while getting product`, error);
            res.status(400).json(error);
        }
    },

    getProductbyId: async(req, res, next) => {
        const { id } = req.params;

        try {
            const result = await Product.findOne({
                where: {
                    id
                },
                include: 'category'
            });
            
            if(!result){
                return res.status(404).json({
                    status: false,
                    message: `Product with id ${id} not found`,
                    data: {}
                })
            }

            res.status(200).json({
                status: true,
                message: 'Product has been found',
                data: result
            })
        } catch (error) {
            console.log(`error while getting product id`, error);
            res.status(400).json(error);
        }
    },

    updateProduct: async(req, res, next) => {
        const { name, quantity, quality, description, categoryID } = req.body;
        const { id } = req.params;
        const productid = await Product.findByPk(id);
        
        try {
            const result = await Product.update({
                name,
                quantity,
                quality,
                description,
                categoryID
            })
            
            if(productid){
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
            }else{
                return res.status(404).json({
                    status: false,
                    message: `Product with id ${id} not found`,
                    data: {}
                })
            }
        } catch (error) {
            console.log(`error while updating product id`, error);
            res.status(400).json(error);
        }
    },

    deleteProduct: async(req, res, next) => {
        const { id } = req.params;
        const productid = await Product.findByPk(id);

        try {
            const result = await Product.destroy({
                where: {
                    id
                }
            })

            if(productid){
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
                    message: `Product with id ${id} not found`,
                    data: {}
                })
            }
        } catch (error) {
            console.log(`error while delete product`, error);
            res.status(400).json(error);
        }
    }
}