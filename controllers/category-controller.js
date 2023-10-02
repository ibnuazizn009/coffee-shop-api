const { Category } = require('../models');
const { makeid } = require('../config/make-id');

module.exports = {
    createCategory: async(req, res, next) => {
        const { name } = req.body;
        try {
           const result = await Category.create({
                id: `CAT${makeid(8)}`,
                name
           });

           res.status(201).json({
                status:true,
                message: 'Created successfull',
                data: result
           })
        } catch (error) {
            console.log(`error while creatng category`, error);
            res.status(400).json(error);
        }
    },

    getCategory: async(req, res, next) => {
        try {
            const result = await Category.findAll();

            if(!result.length){
                return res.status(404).json({
                    status: false,
                    message: 'Category not found',
                    data: {}
                })
            }

            res.status(200).json({
                status: true,
                message: 'Category has been found',
                data: result
            })
        } catch (error) {
            console.log(`error while getting category`, error);
            res.status(400).json(error);
        }
    },

    getCategorybyId: async(req, res, next) => {
        const { id } = req.params;
        try {
            const result = await Category.findByPk(id);

            if(!result){
                return res.status(404).json({
                    status: false,
                    message: `Category with id ${id} not found`,
                    data: {}
                })
            }

            res.status(200).json({
                status: true,
                message: 'Category has been found',
                data: result
            })
        } catch (error) {
            console.log(`error while getting id category`, error);
            res.status(400).json(error);
        }
    },

    updateCategory: async(req, res, next) => {
        const { name } = req.body;
        const { id } = req.params;
        const updateid = await Category.findByPk(id);

        try {
            const result = await Category.update({
                name: name
            }, {where: {id}})

            if(updateid){
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
                    message: `Category with id ${id} not found`,
                    data: {}
                })
            }
            
        } catch (error) {
            console.log(`error while updating category`, error);
            res.status(400).json(error);
        }
    },

    deleteCategory: async(req, res, next) => {
        const { id } = req.params;
        const categoryid = await Category.findByPk(id);

        try {
            const result = await Category.destroy({
                where: {
                    id
                }
            })

            if(categoryid){
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
                    message: `Category with id ${id} not found`,
                    data: {}
                })
            }

        } catch (error) {
            console.log(`error while deleting category`, error);
            res.status(400).json(error);
        }
    }
}