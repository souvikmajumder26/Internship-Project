const mongoose = require('mongoose');
const ud=new mongoose.Schema({
    path:{type: String,required: true},
    caption:{type: String, required: true},
    keyword:[{type:String }]
})
module.exports= mongoose.model('files',ud);