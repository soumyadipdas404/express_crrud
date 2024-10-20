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

const getCategoryById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const itemRes = await categoryModel.findOne({ categoryId: id });
        if (!itemRes) {
            res.status(404).json({
                message: "category not found"
            })
        }
        else {
            res.status(200).json({
                message: "category found",
                data: itemRes
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
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

const editCategory = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the ID from the URL
        const updateData = req.body; // Data to update from the request body

        // Find the document by ID and update it
        const updatedObject = await categoryModel.findOneAndUpdate({ categoryId: id }, updateData, { new: true, runValidators: true });

        if (!updatedObject) {
            return res.status(404).json({ message: 'Object not found' });
        }

        // Return the updated object
        res.status(200).json({
            message: "category updated",
            data: updatedObject
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createCategory,
    getCategory,
    deleteCategoryById,
    editCategory,
    getCategoryById
}