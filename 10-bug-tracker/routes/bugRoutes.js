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
router.get('/', async function (req, res, next) {
    /* bugService
        .getAll()
        .then(function(bugs){
            res.json(bugs);
        }); */

    var bugs = await bugService.getAll();
    res.json(bugs);
});

router.get('/:id', async function (req, res, next) {
    var bugId = parseInt(req.params.id);
    var bug = await bugService.get(bugId)
    if (bug) {
        res.json(bug);
    } else {
        res.sendStatus(404);
    }

});

router.post('/', async function(req, res, next){
    var newBugData = req.body;
    var newBug = await bugService.addNew(newBugData);
    res.status(201).json(newBug);
});

router.put('/:id', async function (req, res, next) {
    var bugId = parseInt(req.params.id),
        updatedBugData = req.body;
    var updatedBug = await bugService.update(bugId, updatedBugData)
    if (!updatedBug)
        return res.sendStatus(404);
    res.json(updatedBug);
});

router.delete('/:id', async function (req, res, next) {
    var bugId = parseInt(req.params.id);
    var result = await bugService.remove(bugId)
    if (!result)
        return res.sendStatus(404);
    res.sendStatus(200);
});

module.exports = router;