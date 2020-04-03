var fs = require('fs');

var dbFile = require('path').join(__dirname, '../db/bugDb.json');

//using callback
/* function getData(callback){
    fs.readFile(dbFile, function (err, fileContents) {
        if (err) return callback(err);
        var bugsList = JSON.parse(fileContents);
        return callback(null, bugsList);
    });    
}

function saveData(bugsList, callback){
    fs.writeFile(dbFile, JSON.stringify(bugsList),callback );
} */

//using promise
function getData() {
    return new Promise(function(resolveFn, rejectFn){
        fs.readFile(dbFile, function (err, fileContents) {
            if (err) return rejectFn(err);
            var bugsList = JSON.parse(fileContents);
            return resolveFn(bugsList);
        });
    });
}

function saveData(bugsList) {
    return new Promise(function(resolveFn, rejectFn){
        fs.writeFile(dbFile, JSON.stringify(bugsList), function(err){
            if (err) return rejectFn(err);
            return resolveFn();
        });
    });
}


module.exports = { getData, saveData };