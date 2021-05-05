const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    completionDate:{
        type: Date,
        required:true
    },
    createdBy:{
        type: String,
        required: true
    },
    votes:{
        type: [String],
        default: []
    }
});

module.exports = Idea = new mongoose.model('Idea', IdeaSchema);