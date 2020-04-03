var express = require('express'),
    router = express.Router(),
    bugService = require('../services/bugService');

//modify this to use the bugService.js

//using callback
/* router.get('/', function(req, res, next){
    bugService.getAll(function(err, bugsList){
        console.log(arguments);
        res.json(bugsList);
    });
});

router.get('/:id', function(req, res, next){
    var bugId = parseInt(req.params.id);
     bugService.get(bugId, function(err, bug){
        if (bug){
            res.json(bug);
        } else {
            res.sendStatus(404);
        }
     })
}); */

//using promise
router.get('/', function (req, res, next) {
    bugService
        .getAll()
        .then(function(bugs){
            res.json(bugs);
        });
    
});

router.get('/:id', function (req, res, next) {
    var bugId = parseInt(req.params.id);
    bugService.get(bugId)
        .then(function(bug){
            if (bug) {
                res.json(bug);
            } else {
                res.sendStatus(404);
            }
        });
});

router.post('/', function(req, res, next){
    var newBugData = req.body
    var newBug = bugService.addNew(newBugData);
    res.status(201).json(newBug);
});

router.put('/:id', function (req, res, next) {
    var bugId = parseInt(req.params.id),
        updatedBugData = req.body;
    var updatedBug = bugService.update(bugId, updatedBugData)
    if (!updatedBug)
        return res.sendStatus(404);
    res.json(updatedBug);
});

router.delete('/:id', function (req, res, next) {
    var bugId = parseInt(req.params.id);
    var result = bugService.remove(bugId)
    if (!result)
        return res.sendStatus(404);
    
    res.sendStatus(200);
    //delte the bug from the array
    //return 200
    //return 404 if the bug does not exist
});

module.exports = router;