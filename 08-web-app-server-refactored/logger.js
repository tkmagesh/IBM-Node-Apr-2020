var chalk = require('chalk');

module.exports = function(req, res, next){
    var logMessage = chalk.yellow(req.method) + '\t' + chalk.cyan(req.urlObj.pathname);
    var startTime = new Date();
    res.on('finish', function(){
        var endTime = new Date(),
            elapsed = endTime - startTime;
        logMessage += '\t' + chalk.red(res.statusCode) + '\t' + chalk.magenta(elapsed) + 'ms';
        console.log(logMessage);
    });
    next();
};