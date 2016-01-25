
var fs = require('fs'),
    podcastUpdater = require('./index.js');

var configPath, htmlPath;
if (process.argv.length < 3) {
  throw new Error('Please provide the path to a config.json file.');
} else {
  configPath = process.argv[2];
  if (process.argv.length > 3) {
    htmlPath = process.argv[3];
  }
}

fs.readFile(configPath, 'utf8', function(error, configJson) {
  var config = JSON.parse(configJson);
  podcastUpdater.generatePodcastXml(config, function(error, xml) {
    if (error) {
      return console.error(error);
    }

    var targetFile = config.target || 'feed.xml';
    fs.writeFile(targetFile, xml, function(error) {
      if (error) {
        return console.error(error);
      }

      console.log('Created/updated "' + targetFile + '".');
    });
  });
});
