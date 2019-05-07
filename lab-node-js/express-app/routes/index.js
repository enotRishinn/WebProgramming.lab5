var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Markdown Editor', fileName: null, fileText: null, myFilesArr: myFilesArr });
});

router.post('/add', function(req, res, next){
  var fileName = req.body.addFile;
  var item = {
    filename: fileName
  };
  mongo.connect(url, function(err, client) {
    assert.equal(null, error);
    db.collection('files').insertOne(item, function(err, result) {
      assert.equal(null, error);
      db.close();

    });
  });

});

router.post('/delete', function(req, res, next){

});

router.post('/update', function(req, res, next){

});

module.exports = router;
