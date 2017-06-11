var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  //first check in public folder
  fs.readFile(archive.paths.siteAssets + asset, function (err, data) {
    if(err) {
      //means file is not present in public
      //so check in archieve folder
      fs.readFile(archive.paths.archivedSites + asset, function (err, data) {
        if(err) {
          //means file is not present in archieve
          callback ? callback : exports.send404(res);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};
//send response with code, header and data
exports.sendResponse = function(res,data, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, exports.headers);
  res.end(data);
}
//send 40 means page not found
exports.send404 = function(res) {
  exports.sendResponse(res, '404: Page not found', 404);
};
//collect post data and send that data to callback function
exports.collectPostData = function(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end',function() {
    callback(data);
  });
}
//redirect to particular url 
exports.sendRedirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};


