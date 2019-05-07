var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
  var myFilesArr = [];
  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db('');
    var cursor = db.collection('files').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      myFilesArr.push(doc.filename);
    }, function(){
      client.close();
      res.render('index', { title: 'Markdown Editor', myFilesArr: myFilesArr, fileName: null, fileText: null });
    });
  });
});

router.get('/file/:fileName', function(req, res, next) {
  var myFilesArr = [];
  var fileText;
  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db('md');
    var cursor = db.collection('files').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      myFilesArr.push(doc.filename);
      var fileStringName = 'C:/Users/Enot/Desktop/Web/lab5/lab-node-js/express-app/public/files/' + req.params.fileName + '.md';
      fileText = fs.readFileSync(fileStringName);
    }, function(){
      client.close();
      res.render('index', { title: 'Markdown Editor', myFilesArr: myFilesArr, fileName: req.params.fileName, fileText: fileText });
    });
  });
});

router.post('/add', function(req, res, next){
  var fileName = req.body.addFile;
  var item = {
    filename: fileName
  };
  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db('md');
    db.collection('files').countDocuments({ filename : fileName}, function (err, num){
      assert.equal(null, err);
      assert.equal(0, num);
      db.collection('files').insertOne(item, function(err, result) {
        assert.equal(null, err);
        client.close();
        var fileStringName = 'C:/Users/Enot/Desktop/Web/lab5/lab-node-js/express-app/public/files/' + fileName + '.md';
        fs.writeFileSync(fileStringName, "");
      res.redirect('/file/' + fileName);
      });
    });
  });
});




module.exports = router;
