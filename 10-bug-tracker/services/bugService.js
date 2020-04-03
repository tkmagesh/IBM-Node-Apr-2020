//modify the below code to persist the data in the db/bugDb.json file

//use JSON.stringify and JSON.parse

function getAll(){
    //read the db
    return bugsList;
}

function get(id){
    //read the db
    return bugsList.find(function(bug){
        return bug.id === id;
    });
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