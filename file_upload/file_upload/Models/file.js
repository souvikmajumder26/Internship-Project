const mongoose = require('mongoose');
const ud=new mongoose.Schema({
    path:{type: String,required: true},
    caption:{type: String, required: true}
})
module.exports= mongoose.model('files',ud);