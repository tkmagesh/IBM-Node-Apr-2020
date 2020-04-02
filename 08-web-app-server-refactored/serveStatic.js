var fs = require('fs'),
    path = require('path');
    
var staticResExtns = ['.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico', '.jpg'];

function isStatic(resource) {
    var resExtn = path.extname(resource);
    return staticResExtns.indexOf(resExtn) >= 0;
}

module.exports = function(req, res){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
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
    }
}