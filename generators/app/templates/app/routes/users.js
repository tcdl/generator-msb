var express = require('express');
var router = express.Router();

var usersList = [];
usersList.push({firstName: 'Alica', lastName: 'Smith'});
usersList.push({firstName: 'Neo', lastName: 'Chosen One'});

router.get('/', function(req, res, next) {
    res.status(200).json(usersList);
});

router.get('/:id/', function(req, res, next) {
    var user = usersList[req.params.id];
    if (user) {
        return res.status(200).json(user);
    }
    res.sendStatus(404);
});

module.exports = router;
