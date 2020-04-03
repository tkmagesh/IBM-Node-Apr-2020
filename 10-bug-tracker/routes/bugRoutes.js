var express = require('express'),
    router = express.Router();

var bugsList = [
    {
        id : 1,
        name: 'Server communication failure',
        isClosed : false,
        createdAt : new Date()
    },
    {
        id: 2,
        name: 'Application not responding',
        isClosed: true,
        createdAt: new Date()
    },
];


router.get('/', function(req, res, next){
    res.json(bugsList);
});

router.get('/:id', function(req, res, next){
    var bugId = parseInt(req.params.id),
        bug = bugsList.find(function(bug){
            return bug.id === bugId;
        });
    if (bug){
        res.json(bug);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', function(req, res, next){
    var newBugData = req.body;
    var newBugId = bugsList.reduce(function(result, bug) { 
        return result > bug.id ? result : bug.id;
    }) + 1;
    newBugData.id = newBugId;
    bugsList.push(newBugData);
    res.status(201).json(newBugData);
});

router.put('/:id', function (req, res, next) {
    var bugId = parseInt(req.params.id),
        updatedBugData = req.body;
    var existingBug = bugsList.find(function(bug){
        return bug.id === bugId;
    });
    if (!existingBug)
        return res.sendStatus(404);
    bugsList = bugsList.map(function(bug){
        return bug.id === bugId ? updatedBugData : bug;
    });
    res.json(updatedBugData);
});

router.delete('/:id', function (req, res, next) {
    var bugId = parseInt(req.params.id);
    var existingBug = bugsList.find(function (bug) {
        return bug.id === bugId;
    });  
    if (!existingBug)
        return res.sendStatus(404);
    bugsList = bugsList.filter(function (bug) {
        return bug.id !== bugId;
    });
    res.sendStatus(200);
    //delte the bug from the array
    //return 200
    //return 404 if the bug does not exist
});

module.exports = router;