var querystring = require('querystring'),
    calculator = require('./calculator');

    
module.exports = function(req, res){
    if (req.urlObj.pathname === '/calculator' && req.method === 'GET') {
        var data = querystring.parse(req.urlObj.query),
            op = data.op,
            x = parseInt(data.x),
            y = parseInt(data.y);
        var result = calculator[op](x, y);
        res.write(result.toString());
        res.end();
    } else if (req.urlObj.pathname === '/calculator' && req.method === 'POST') {
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
    } 
}