var express = require('express');
var router = express.Router();

/* Device API */
router.route('/:id')

  .post(function(req, res) {
      res.send('device successfully created.');
  })

  .get(function(req, res, next) {
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
