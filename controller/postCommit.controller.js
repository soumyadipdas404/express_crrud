'use strict'
const postCommitModel = require("../schema/postCommit.schema");

const createItem = async (req, res, next) => {
    const { itemId } = req.body;
    try {
        let item = await postCommitModel.findOne({ itemId: itemId });
        if (item) {
            res.status(404).json({
                message: "item already exist",
                data: item
            });
        }
        const data = new postCommitModel(req.body);
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
        const itemRes = await postCommitModel.find({})
        if (!itemRes || itemRes.length === 0) {
            res.status(404).json({
                message: "no items found",
                data: []
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

module.exports = {
    createItem,
    getAllItems
}