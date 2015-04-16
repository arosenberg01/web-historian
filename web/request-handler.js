var path = require('path');
var qs = require('querystring');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var httpHelpers = require('./http-helpers.js')
var sendResponse = httpHelpers.sendResponse;
// require more modules/folders here!



var actions = {
  'GET': function(req, res){
    var requestSent = false;
    var reqPath = url.parse(req.url).pathname;
    if (reqPath === '/') {
      fs.readFile(path.join(__dirname,"/public","index.html"),function(err,data) {
        sendResponse(res, data, 200);
        requestSent = true;
      });
      return;
    }
    if (requestSent) { return; }
    fs.readFile(path.join(__dirname,"/public",url.parse(req.url).pathname),function(err,data) {
      if(err) {
        console.log("Could not find requested file in /public");
      } else {
        sendResponse(res, data, 200);
        requestSent = true;
        console.log("Found requested file in /public, serving it");
        return;
      }
    });

    if (requestSent) { return; }

    console.log("Responding 404: something is wrong!")
    sendResponse(res, null, 404);
  },
  'POST': function(req, res){
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      var targetHost = url.parse(qs.parse(data).url).hostname;
      archive.isURLArchived(targetHost, function(fileExists) {
      // if isURLArchived === true
        if (fileExists) {
          res.writeHead(301, {"Location": "/"}) // FIXXXXX
          sendResponse(res, null, 301);
          // send 301 to archived page
        } else {
          //  if isURLInList === true
          archive.isUrlInList(targetHost, function(isInList) {
            if (isInList) {
              res.writeHead(301, {"Location": "/"});
              sendResponse(res, null, 301);
              // 301 loading.html
            } else {
              // addUrlToList
            }
          });
        }
      })
    });
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
