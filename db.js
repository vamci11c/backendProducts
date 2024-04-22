const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/blogsDB'
mongoose.connect(url, { useNewUrlParser: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected successfully');
});