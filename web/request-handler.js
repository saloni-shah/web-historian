var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var urlPath = url.parse(req.url).pathname;
    // / means index.html
    if (urlPath === '/') { urlPath = '/index.html'; }
    helpers.serveAssets(res, urlPath, function(){
      if(urlPath[0] === '/') {
        urlPath = urlPath.slice(1);
      }
      archive.isUrlInList(urlPath, function(status) {
        if (status) {
          //means loading.html, it's not properly downloaded yet
          helpers.serveAssets(res, '/loading.html');
        } else {
          //else not found
          helpers.send404(res);
        }
      });
    });
  } else {
    helpers.collectPostData(req, function(data){
      var url = data.split('=')[1].replace('http://', '');
      //check url exists in archieve url list
      archive.isUrlInList(url, function(status) {
        if(status){
          //now check it's archieved or not
          archive.isUrlArchived(url, function(status) {
            if (status) {
              //redirect to page ex. www.fb.com
              helpers.sendRedirect(res, '/' + url);
            } else {
              // Redirect to loading.html
              helpers.sendRedirect(res, '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(url, function() {
            // download it first so it will be available for nexxt time
            archive.downloadUrls([url]);
            //and then redirect to loading.html
            helpers.sendRedirect(res, '/loading.html');
          });
        }
      });
    });
  }  
};
