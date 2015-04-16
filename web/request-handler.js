var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers.js')
var sendResponse = httpHelpers.sendResponse;
// require more modules/folders here!



var actions = {
  'GET': function(req, res){
    var reqPath = url.parse(req.url).pathname;
    if (reqPath === '/') {
      fs.readFile(path.join(__dirname,"/public","index.html"),function(err,data) {
        sendResponse(res, data, 200);

      });
      return;
    }
    fs.readFile(path.join(__dirname,"/public",url.parse(req.url).pathname),function(err,data) {
      if(err) {
        console.log("Could not find requested file in /public");
        sendResponse(res, null, 404);
      } else {
        sendResponse(res, data, 200)
        console.log("Found requested file in /public, serving it");
        return;
      }
    });


    // if URL = "/*" but not another /
      //  if file exists in web/public, serve it
      //  else, respond with 404.
  },
  'POST': function(req, res){
    sendResponse(res, {}, 200);
  },
  'OPTIONS': function(req, res){
    sendResponse(res);
  }
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};


exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if( action ){
    action(req, res);
  } else {
    sendResponse(res, "Not Found", 404);
  }
  //res.end(archive.paths.list);
};
