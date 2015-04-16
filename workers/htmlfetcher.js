// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var helpers = require('../helpers/archive-helpers.js');

helpers.readListOfUrls(function(list) {
  helpers.isUrlInList(function(url, isInList) {
    if (isInList) {
      helpers.isURLArchived(url, function
    } else {
      helpers.addUrlToList();
    }
  })
})
