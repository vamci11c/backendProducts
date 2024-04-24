const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    emailId: String,
    phone: Number,
    password: String,
    age: Number
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;