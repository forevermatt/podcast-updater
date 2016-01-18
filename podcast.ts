declare var module: any;
declare var require: any;

var podcastWebpage = require('./podcast-webpage.js');

class Podcast {

  constructor(config, htmlPath) {
    var htmlPathToUse;
    if (htmlPath) {
      htmlPathToUse = htmlPath;
    } else if (config.link) {
      htmlPathToUse = config.link;
    } else {
      throw new Error(
        'Please either provide an htmlPath or include a "link" property in ' +
        'your config.json.'
      );
    }

    this.getMp3Data(htmlPathToUse, function(error, mp3Data) {
      if (error) {
        console.error(error);
      } else {
        console.log(mp3Data);
      }
    });
  }

  private getMp3Data(path, callback) {
    var webpage = new podcastWebpage(path);
    webpage.getListOfMp3s(callback);
  }
}

module.exports = Podcast;
