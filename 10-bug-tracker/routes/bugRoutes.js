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
    //update the array
    //return the newbug with status code 201
});

router.put('/:id', function (req, res, next) {
    var bugId = parseInt(req.params.id),
        updatedBugData = req.body;
    //update the bugsList array
    //return the updated bug
    //return 404 if the bug does not exist
});

router.delete('/:id', function (req, res, next) {
    var bugId = parseInt(req.params.id),
       
    //delte the bug from the array
    //return 200
    //return 404 if the bug does not exist
});

module.exports = router;