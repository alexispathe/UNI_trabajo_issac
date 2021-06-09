const mongoose = require('mongoose');
const schema = mongoose.Schema;
const projectSchema = schema({
    title: String,
    author: String,
    fullDate: String,
    idUser: String,
    description: String,
})
module.exports = mongoose.model('project', projectSchema)