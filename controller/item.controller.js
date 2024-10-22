'use strict'
const itemModel = require('../schema/item.schema')

const createItem = async (req, res, next) => {
    const { itemId } = req.body;
    try {
        let item = await itemModel.findOne({ itemId: itemId });
        if (item) {
            res.status(404).json({
                message: "item already exist",
                data: item
            });
        }
        const data = new itemModel(req.body);
        const savedItem = await data.save();
        res.status(200).json({
            message: "item created",
            data: savedItem
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllItems = async (req, res, next) => {
    try {
        const itemRes = await itemModel.find({})
        if (!itemRes || itemRes.length === 0) {
            res.status(404).json({
                message: "no items found",
                data:[]
            })
        }
        else {
            res.status(200).json({
                message: "items found",
                data: itemRes
            })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const deleteItemById = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await itemModel.findOneAndDelete({ itemId: itemId });
        if (!deletedItem) {
            res.status(404).json({
                message: "item not found",
                data:null
            })
        } else {
            res.status(200).json({
                message: "item deleted",
                item: deletedItem
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getItemById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const itemRes = await itemModel.findOne({ itemId: id });
        if (!itemRes) {
            res.status(404).json({
                message: "item not found",
                data:null
            })
        }
        else {
            res.status(200).json({
                message: "item found",
                data: itemRes
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const editItem = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the ID from the URL
        const updateData = req.body; // Data to update from the request body

        // Find the document by ID and update it
        const updatedObject = await itemModel.findOneAndUpdate({ itemId: id }, updateData, { new: true, runValidators: true });

        if (!updatedObject) {
            return res.status(404).json({
                message: 'item not found',
                data:null
            });
        }

        // Return the updated object
        res.status(200).json({
            message: "item updated",
            data: updatedObject
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createItem,
    getAllItems,
    deleteItemById,
    getItemById,
    editItem
}