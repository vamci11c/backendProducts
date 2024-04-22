const mongoose = require('mongoose');

const bogSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const BlogModel = mongoose.model('ridge', bogSchema);

module.exports = BlogModel;