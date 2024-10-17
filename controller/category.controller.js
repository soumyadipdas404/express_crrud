'use strict'
const categoryModel = require('../schema/category.schema')

const createCategory = async (req, res, next) => {
    try {
        const data = new categoryModel(req.body);
        const savedCategory = await data.save();
        res.status(200).json({
            message: "category created",
            data: savedCategory
        })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const getCategory = async (req, res, next) => {
    try {
        const catRes = await categoryModel.find({});
        if (!catRes) {
            res.status(400).json({
                message: "no categories found"
            })
        }
        else if (catRes.length === 0) {
            res.status(400).json({
                message: "no categories found"
            })
        }
        else {
            res.status(200).json({
                message: "categories found",
                data: catRes
            })
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

const deleteCategoryById = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoryModel.findOneAndDelete({ categoryId: categoryId });

        if (!deletedCategory) {
            res.status(404).json({
                message: "category not found"
            })
        }
        else {
            res.status(200).json({
                message: "category deleted",
                category: deletedCategory
            })
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports = {
    createCategory,
    getCategory,
    deleteCategoryById
}