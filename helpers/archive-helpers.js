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
  fs.readFile('test/testdata/sites.txt', 'utf8', (err, data) => {
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
      //go through one by one url
    _.each(urls, function(currentUrl) { 
      //check if currenturl is matching with targeturl
      if (currentUrl === url) {
        return callback(true);
      }
    });
    return callback(false);
  });
};

exports.addUrlToList = function(url, callback) {
  //easily solved by reading documentation
  fs.writeFile('test/testdata/sites.txt', url, 'utf8', callback);
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
