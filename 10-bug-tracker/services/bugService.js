var bugsList = [
    {
        id: 1,
        name: 'Server communication failure',
        isClosed: false,
        createdAt: new Date()
    },
    {
        id: 2,
        name: 'Application not responding',
        isClosed: true,
        createdAt: new Date()
    },
];

function getAll(){
    return bugsList;
}

function get(id){
    return bugsList.find(function(bug){
        return bug.id === id;
    });
}

function addNew(bug){
        bug.id  = bugsList.reduce(function (result, bug) {
            return result > bug.id ? result : bug.id;
        }) + 1;
        bugsList.push(bug);
        return bug;
}

function update(id, updatedBug){
    var existingBug = bugsList.find(function (bug) {
        return bug.id === id;
    });
    if (!existingBug) return;
    bugsList = bugsList.map(function (bug) {
        return bug.id === id ? updatedBug : bug;
    });
    return updatedBug;
}

function remove(bugId){
    var existingBug = bugsList.find(function (bug) {
        return bug.id === bugId;
    }); 
    if (!existingBug) return;
    bugsList = bugsList.filter(function (bug) {
        return bug.id !== bugId;
    });
    return true;
}

module.exports = { getAll, get, addNew, update, remove };