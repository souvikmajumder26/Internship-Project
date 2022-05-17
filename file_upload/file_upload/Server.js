var express	=	require("express");
var bodyParser=require('body-parser');
var multer	=	require('multer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const save_file= require('./Models/file');
var app	=	express();
var fs = require('fs');

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
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(__dirname + "/home.html");
});
app.get('/home',function(req,res){
  res.sendFile(__dirname + "/home.html");
});
app.get('/about',function(req,res){
  res.sendFile(__dirname + "/about.html");
});
app.get('/upload', function(req,res){
  res.sendFile(__dirname+'/upload.html') 

});
app.get('/search', function(req,res){
  res.sendFile(__dirname+'/search.html')
  //res.render('search.html')
});

app.post('/search',async function(req,res){
  /*search(req,res,async function(err) {
		if(err) {
      console.log(err);
			return res.end("Error searching file.");
		}
    const keyword= req.body.caption;
    console.log(keyword);

    const data= await save_file.find({caption:keyword});
    res.send(data);
	});*/
  //const keyword= req.body.key;
  //res.send(keyword);
  const keyword=req.body.key;
  console.log(keyword);
  const data= await save_file.find({keyword:keyword})
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].path);
  }
  console.log(data);
  console.log(typeof data);
  //const t=data[0].path;
  //res.redirect('/video.html', {name:t});

  //res.send(path);
  //res.sendFile(__dirname+'/video.html')
  /*const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }*/
});



app.post('/upload',  function(req,res){ 
	upload(req,res,async function(err) {
		if(err) {
      console.log(err);
			return res.end("Error uploading file.");
		}
    const caption= req.body.caption;
    console.log(caption);

    //const det=req.file["path"];
    //console.log(det);
    const path= req.file.path;
    console.log(path);
    function convertToText(path) {
      var spawn = require('child_process').spawn;
      const scriptExecution = spawn("python", ["keywords_extract_rake.py", path])
      var keyword=[]
      scriptExecution.stdout.on('data',async function (data) {
      data=data.toString();
      data=data.slice(2,-4);
      console.log(data);
      const array = data.split("\', \'");
      for (let i = 0; i < array.length; i++) {
        keyword.push(array[i]);
      }
      console.log(keyword);
      await save_file.create({path,caption,keyword});
      //return keyword;
    });
    
    return keyword;
  }
    var keyword=convertToText(path);
    //convertToText(path);
    //var keyword=['ans','ques'];
    
    keyword.push(caption);
    
    
    //alert("File is uploaded successfully!");
		//res.end("File is uploaded successfully!");
    
	});
});

app.listen(4000,function(){
    console.log("Server is running on port 4000");
});
