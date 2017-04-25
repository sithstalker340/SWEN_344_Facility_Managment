var express = require('express');
var router = express.Router();

router.get('/classroom/:id', function(req, res, next) {
    console.log(res);
    res.send(req.params);
    res.render('classroom');
});

module.exports = router;
