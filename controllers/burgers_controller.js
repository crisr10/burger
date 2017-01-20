var express = require('express');
var burger = require('../models/burger.js');
var router = express.Router();

router.get('/index', function (req,res) {
	burger.selectAll(function(data) {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/index', function (req, res){
	console.log('BURGER NAME: '+req.body.burger_name);
	burger.insertOne([
		'burger_name', 'devoured'], [req.body.burger_name, 1], function(){
			res.redirect('/index');
		});
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/index");
  });
});

module.exports = router;

