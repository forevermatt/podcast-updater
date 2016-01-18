
var fs = require('fs'),
    Podcast = require('./podcast.js');

if (process.argv.length < 3) {
  throw new Error('Please provide the path to a config.json file.');
}

fs.readFile(process.argv[2], 'utf8', function(error, configJson) {
  var config = JSON.parse(configJson)
  var podcast = new Podcast(config);
});
