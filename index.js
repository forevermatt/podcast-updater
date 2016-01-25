
var Podcast = require('./podcast.js');

module.exports.generatePodcastXml = function(config, callback) {
  var podcast = new Podcast(config);
  podcast.generateXml(function(error, xml) {
    if (error) {
      console.error(error);
      return callback(new Error(error), null);
    }

    console.log('Successfully generated podcast XML for "' + config.link + '"');
    return callback(null, xml);
  });
};
