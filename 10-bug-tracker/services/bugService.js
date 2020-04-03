//modify the below code to persist the data in the db/bugDb.json file

//use JSON.stringify and JSON.parse
var db = require('./db');

//using callback
/* function getAll(callback){
    db.getData(callback);
}

function get(id, callback){
    //read the db
    db.getData(function(err, bugsList){
        var bug = bugsList.find(function(bug){
            return bug.id === id;
        });
        return callback(err, bug);
    });
} */

//using promise
function getAll() {
    return db.getData();
}

async function get(id) {
    //read the db
    /*  return db
        .getData()
        .then(function(bugsList){
            var bug = bugsList.find(function (bug) {
                return bug.id === id;
            });
            return bug;
        }); */

    var bugsList = await db.getData(); 
    var bug = bugsList.find(function (bug) {
        return bug.id === id;
    });
    return bug;

    
}

function addNew(bug){
        //read the db
        bug.id  = bugsList.reduce(function (result, bug) {
            return result > bug.id ? result : bug.id;
        }) + 1;
        bugsList.push(bug);
        //write to the db
        return bug;
}

function update(id, updatedBug){
    //read the db
    var existingBug = bugsList.find(function (bug) {
        return bug.id === id;
    });
    if (!existingBug) return;
    bugsList = bugsList.map(function (bug) {
        return bug.id === id ? updatedBug : bug;
    });
    //write to the db
    return updatedBug;
}

function remove(bugId){
    //read the db
    var existingBug = bugsList.find(function (bug) {
        return bug.id === bugId;
    }); 
    if (!existingBug) return;
    bugsList = bugsList.filter(function (bug) {
        return bug.id !== bugId;
    });
    //write to the db
    return true;
}

module.exports = { getAll, get, addNew, update, remove };