const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = schema({
    name: String,
    email: String,
    password: String,
    username: String,
    role: String,
    image: String,
    date: String,
    gender: String,
    country: String
})
module.exports = mongoose.model('user', userSchema)