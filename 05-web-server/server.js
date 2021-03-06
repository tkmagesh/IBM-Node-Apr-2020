var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

//req (IncomingMessage), Readable
//res (ServerResponse), Writable

var server = http.createServer(function(req, res){
    var resourceRequested = req.url === '/' ? 'index.html' : req.url;
    var urlObj = url.parse(resourceRequested);
    var resourceName = urlObj.pathname;
    console.log(resourceName);
    var resourceFullName = path.join(__dirname, resourceName);
    if (fs.existsSync(resourceFullName)){
        var stream = fs.createReadStream(resourceFullName);
        stream.on('error', function(err){
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
        stream.pipe(res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on 8080..!!');
});