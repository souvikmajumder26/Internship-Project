var express	=	require("express");
var multer	=	require('multer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const save_file= require('./Models/file');

var app	=	express();
dotenv.config();
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('connected to db');
});
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('files');
console.log(upload);

app.get('/',function(req,res){
      res.sendFile(__dirname + "/main.html");
});
app.get('/upload', function(req,res){
  res.sendFile(__dirname+'/upload.html') 
})

app.get('/search', async function(req,res){
  //const keyword= req.body["keyword"];
  const keyword="qwerty"
  const data= await save_file.find({caption:keyword})
  res.send(data);
})

app.post('/upload',  function(req,res){ 
	upload(req,res,async function(err) {
		if(err) {
      console.log(err);
			return res.end("Error uploading file.");
		}
    const caption= req.body.caption;
    console.log(caption);

    const det=req.file["path"];
    console.log(det);
    const path= req.file.path;
    await save_file.create({path,caption});

		res.end("File is uploaded successfully!");
    
	});
});

app.listen(4000,function(){
    console.log("Server is running on port 4000");
});
