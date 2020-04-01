var fs = require('fs');

/* sync */

/* try{
    var fileContents = fs.readFileSync('./sample1.txt', { encoding : 'utf8'});
    console.log(fileContents);
    console.log('thats all folks!'); 
} catch(err){
    console.log('something went wrong!');
    console.log(err);
}
 */


/* async */
// error first callback pattern

/*  fs.readFile('./sample.txt', { encoding: 'utf8' }, function(err, fileContents){
    if (err){
        console.log('something went wrong!');
        console.log(err);
        return;
    }
    console.log(fileContents);
    console.log('thats all folks!'); 
}); */

/* streams */

/* 
var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'});
//readable stream events - open, data, end, close, error

var counter = 0;
stream.on('data', function(chunk){
    console.log(chunk);
    ++counter;
});

stream.on('end', function(){
    console.log('thats all folks!'); 
    console.log('read completed with ', counter, ' chunks');
});

stream.on('error', function(err){
    console.log('something went wrong!');
    console.log(err);
});
 */

/* 
Abstractions
1. ReadStream (Stream.Readable), WriteStream (Stream.Writable)
2. EventEmitter (events)
*/

var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'});
/* var dest = fs.createWriteStream('./newSample.txt');
stream.pipe(dest); */
stream.pipe(process.stdout);

stream.on('end', function(){
    console.log('thats all folks!');
});

