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
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../web/archives/sites'),
  'list' : path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
//

// worker uses this
exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.archivedSites, function(err, data) {
    if (err) { console.log ("Error: " + err)
    } else {
      var urlArray = data.split('\n');
      returnable.results = urlArray;
      callback(returnable);
    }
  });
};

// POST request handler uses this
exports.isUrlInList = function(url, callback){

};

// POST request handler uses this
exports.addUrlToList = function(data){
  fs.appendFile(archive.paths.list, qs.parse(data).url + "\n", function(err) {
  });
};

// POST request handler uses this
exports.isURLArchived = function(hostname, callback){
  fs.readFile(path.join(exports.paths.archivedSites, hostname), function(err, file) {
    if (err) {
      callback(false);
    }
    else {
      callback(true);
    }
  });

  // returns a boolean
};

// worker uses this
exports.downloadUrls = function(){
};

// exports.censorURL = function(str) {
//   var returnable = str;
//   while(returnable.indexOf("/") > -1) {
//     returnable = returnable.replace('/', '|');
//   }
//   return returnable;
// };

// exports.uncensorURL = function(str) {
//   var returnable = str;
//   while(returnable.indexOf("|") > -1) {
//     returnable = returnable.replace('|', '/');
//   }
//   return returnable;
// };

