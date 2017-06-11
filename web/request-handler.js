var http = require('http');
var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //default file of index.html
  var file;
  var statusCode;
  //slice url from first index
  // console.log(req.url);
  // if(req.url === '/') {
  //   file = archive.paths.siteAssets + '/index.html';
  //   fs.readFile(file, function (err, data) {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write(data);
  //     res.end();
  //   });
  // }
  // req.url = req.url.slice(1);
  // //check status after calling isurlinlist 
  // if (req.url !== '/') {
  //   archive.isUrlInList(req.url, function(status) {
  //     if (status) {
  //       //go to request url
  //       file = archive.paths.archivedSites + '/' + req.url;
  //     } else {
  //       //else loading.html
  //       file = archive.paths.siteAssets + '/loading.html';
  //     }
  //     //readfile data display it
  //     fs.readFile(file, function (err, data) {
  //       res.writeHead(200, {'Content-Type': 'text/html'});
  //       res.write(data);
  //       res.end();
  //     });
  //   });
  // }

  if (req.method === 'GET') {
    req.url = req.url.slice(1);
    //check status after calling isurlinlist 
    if (req.url !== '/') {
      archive.isUrlInList(req.url, function(status) {
        if (status) {
          //go to request url
          file = archive.paths.archivedSites + '/' + req.url;
          statusCode = 200;
        } else {
          //else index.html
          file = archive.paths.siteAssets + '/index.html';
          statusCode = 404;
        }
        //readfile data display it
        fs.readFile(file, function (err, data) {
          res.writeHead(statusCode, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
      });
    }
  } else {
    console.log("hello");
  }
  
  
};
