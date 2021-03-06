//create the server that will behave both like a web server and app server depending on the request

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

//req (IncomingMessage), Readable
//res (ServerResponse), Writable

var staticResExtns = [ '.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico', '.jpg' ];

function isStatic(resource){
    var resExtn = path.extname(resource);
    return staticResExtns.indexOf(resExtn) >= 0;
}

var server = http.createServer(function (req, res) {
    var resourceRequested = req.url === '/' ? 'index.html' : req.url;
    var urlObj = url.parse(resourceRequested);
    var resourceName = urlObj.pathname;
    console.log(req.method + '\t' + resourceName);
    if (isStatic(resourceName)) {
        var resourceFullName = path.join(__dirname, resourceName);
        if (fs.existsSync(resourceFullName)) {
            var stream = fs.createReadStream(resourceFullName);
            stream.on('error', function (err) {
                console.log(err);
                res.statusCode = 500;
                res.end();
            });
            stream.pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else if (urlObj.pathname === '/calculator' && req.method === 'GET') {
        var data = querystring.parse(urlObj.query),
            op = data.op,
            x = parseInt(data.x),
            y = parseInt(data.y);
        var result = calculator[op](x, y);
        res.write(result.toString());
        res.end();
    } else if (urlObj.pathname === '/calculator' && req.method === 'POST') {
        var rawData = '';
        req.on('data', function (chunk) {
            rawData += chunk;
        });
        req.on('end', function () {
            var data = querystring.parse(rawData),
                op = data.op,
                x = parseInt(data.x),
                y = parseInt(data.y);
            var result = calculator[op](x, y);
            res.write(result.toString());
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);

server.on('listening', function () {
    console.log('web app server listening on 8080..!!');
});