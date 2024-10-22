'use strict'
const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
    },
    projectVersion: {
        type: String,
    },
    author: {
        type: String,
    }
});
const projectModel = mongoose.model('projectdetails', projectSchema);
const getProjectInfo = async (req, res, next) => {
    try {
        const projectRes = await projectModel.find({})
        return res.status(200).json({
            projectName: projectRes[0].projectName,
            projectVersion: projectRes[0].projectVersion,
            author: projectRes[0].author
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
module.exports = {
    getProjectInfo,
}