var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //read file sites.txt and fetch urls
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) { 
      throw err;
    }
    //split urls by new line
    var splitData = data.split('\n');
    //pass array of urls to callback function
    return callback(splitData);
  });
};

exports.isUrlInList = function(url, callback) {
  //call readListOfUrls and get list of urls
  exports.readListOfUrls(function(urls) {
    //check list of urls contains currenturl
    if (_.contains(urls, url)) {
      //call callback
      callback(true);
    } else {
      //call callback
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  //if isUrlInList is true
  if (exports.isUrlInList(url, callback)) {
    callback();
  } else {
    //append url to file and call callback
    fs.appendFile(exports.paths.list, url.concat('\n'), function (err) {
      if (err) { throw err; }
      callback();
    });
  }
};


exports.isUrlArchived = function(url, callback) {
  //check to see if there is a url directory
  if (path.dirname(exports.paths.archivedSites + `/${url}`)) {
    return callback(true);
  }
  return callback(false);
  
};

exports.downloadUrls = function(urls) {
};
