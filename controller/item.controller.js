'use strict'
const itemModel = require('../schema/item.schema')

const createItem = async (req, res, next) => {
    const { itemId } = req.body;
    try {
        let item = await itemModel.findOne({ itemId: itemId });
        if (item) {
            res.status(400).json({
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
        if (!itemRes || itemRes.length===0) {
            res.status(400).json({
                message: "no items found"
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
                message: "item not found"
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

module.exports = {
    createItem,
    getAllItems,
    deleteItemById
}