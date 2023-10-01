const {sequelize, Category} = require('../models');
const {makeid} = require('../config/make-id');

module.exports = {
    createCategory: async(req, res, next) => {
        const { name } = req.body;
        try {
           const result = await Category.create({
                id: `CAT${makeid(8)}`,
                name
           });

           res.status(200).json({
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
    }
}