var fs = require('fs'),
    path = require('path');
    
var staticResExtns = ['.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico', '.jpg'];

function isStatic(resource) {
    var resExtn = path.extname(resource);
    return staticResExtns.indexOf(resExtn) >= 0;
}

module.exports = function(req, res, next){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        var resourceFullName = path.join(__dirname, resourceName);
        if (fs.existsSync(resourceFullName)) {
            /* 
            var fileContents = fs.readFileSync(resourceFullName);
            res.write(fileContents);
            res.end(); 
            */
             var stream = fs.createReadStream(resourceFullName);
            stream.on('error', function (err) {
                console.log(err);
                res.statusCode = 500;
                res.end();
            });
            stream.pipe(res);
            stream.on('end', function(){
                next()
            });
        }
    } else {
        next();
    }
}