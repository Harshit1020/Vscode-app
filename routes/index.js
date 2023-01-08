var express = require('express');
var router = express.Router();
var fs = require('fs')
const mime = require('mime');

//  for / router
router.get('/', function(req, res) {
  var files = [];
 var data= fs.readdirSync('./uploads',{withFileTypes:true});
  data.forEach(function(elem){
    files.push({name:elem.name, isFolder:elem.isDirectory()});
  })
  res.render('index',{data:files ,filename:""});
  
});

// for data write in file and change the file 
router.get('/file/:filename', function(req,res){
  var files = [];
 var data= fs.readdirSync('./uploads',{withFileTypes:true});
  data.forEach(function(elem){
    files.push({name:elem.name, isFolder:elem.isDirectory()});
  })

  fs.readFile(`./uploads/${req.params.filename}`,"utf8",function(err,data){

    res.render('index',{data:files,filename:req.params.filename, filedata:data})

  })
})

// for save button

router.post('/save/:filename',function(req,res){

  fs.writeFile(`./uploads/${req.params.filename}`,req.body.filedata,function(err){

      res.redirect('back')

  })

})



// for file create

router.get('/filecreate',function(req,res){

  fs.writeFile(`./uploads/${req.query.filename}`, "" ,function(err){

    res.redirect('/')

  })
  
})

// for folder create
router.get('/foldercreate',function(req,res){

  fs.mkdir(`./uploads/${req.query.foldername}`, function(err){
 
     res.redirect('/')
  })
})


// for file delete
router.get('/delete/:name',function(req,res){

  fs.unlink(`./uploads/${req.params.name}`,function(err){

    res.redirect('/')

  })

})
module.exports = router;


