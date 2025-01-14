const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const postCommitSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(7)
    },
    branchName:{
        type: String,
        required: true,
    },
    commitMessage:{
        type: String,
    },
    changedFiles:{
        type: String,
    },
    commitHash:{
        type: String,
    }
})

module.exports = mongoose.model('postCommits', postCommitSchema);