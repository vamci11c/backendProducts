const UserModel = require('../Model/user');
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');

// Generate a UUID


// console.log(uuid);


//@desc Create  user
//@route post /api/user
//@access public
async function createUser(req, res) {
    console.log("create product body", req.body);
    const userId = uuidv4();
    const { name, emailId, phone, password, age } = req.body;
    try {
        const newUser = new UserModel({ userId, name, emailId, phone, password, age });
        console.log("newUser", newUser)
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    // res.status(200).json({ message: "create a user" });
};

//@desc get all users
//@route GET /api/user
//@access public
async function getAllUsers(req, res) {
    try {
        const users = await UserModel.find({});
        console.log('users', users)
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};



//@desc Get individual  user
//@route GET /api/user/id
//@access public
const getUserById = asyncHandler((req, res) => {
    res.status(200).json({ message: `get user ${req.params.id}` });
});

//@desc Edit individual  user
//@route PUT /api/user/id
//@access public
const updateUser = asyncHandler((req, res) => {
    res.status(200).json({ message: `update user ${req.params.id}` });
});

//@desc Delete individual  user
//@route DELETE /api/user/id
//@access public
const deleteUser = asyncHandler((req, res) => {
    res.status(200).json({ message: `delete user ${req.params.id}` });
});

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
