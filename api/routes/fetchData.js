var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    res.sendFile('templates.json',{
        root: '../data'
    });
});

module.exports = router;