var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
	var html = fs.readFileSync(__dirname +'/../views/index.html');
  	res.end(html);
});

router.get('/verTodo', function(req, res, next) {
	var html = fs.readFileSync(__dirname +'/../views/verTodo.html');
  	res.end(html);
});


module.exports = router;
