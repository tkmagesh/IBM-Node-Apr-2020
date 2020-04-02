var http = require('http');

//req (IncomingMessage), Readable
//res (ServerResponse), Writable

var server = http.createServer(function(req, res){
    console.log(req.url);
    res.write('<h1>Welcome to Node.js</h1>');
    res.end();
});

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on 8080..!!');
});