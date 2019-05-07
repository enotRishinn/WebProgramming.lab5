var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

router.get('/', function(req, res, next) {
  myFilesArr = [];
  res.render('index', { title: 'Markdown Editor', fileName: null, fileText: null, myFilesArr: myFilesArr });
});

router.post('/add', function(req, res, next){
  var fileName = req.body.newFile;
  var item = {
    filename: fileName
  };
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
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
  res.redirect('/');
});

module.exports = router;
