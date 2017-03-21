var express = require('express');
var router = express.Router();

/* GET classroom info */
router.get('/:id', function(req, res, next) {
	var classroom = {
		building : "GOL",
		room : req.params.id,
		size : 30
	};
	res.json(classroom);
});

module.exports = router;
