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
})
module.exports = router;