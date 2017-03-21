var express = require('express');
var router = express.Router();

/* GET classroom info */
router.get('/:id', function(req, res, next) {
	var device = {
		id : req.params.id,
		room : req.params.classroom,
		student_id : req.params.student_id,
    student_name : req.params.student_name,
    reserved : req.params.reserved,
    condition: req.params.condition,
    return_date : req.params.return_date
	};
	res.json(device);
});

module.exports = router;
