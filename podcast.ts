declare var module: any;
declare var require: any;

var podcastWebpage = require('./podcast-webpage.js');

class Podcast {

  constructor(config) {
    if (config.htmlPath === undefined) {
      throw new Error(
        'Please provide an "htmlPath" property in your config.json.'
      );
    }

    this.getMp3Data(config.htmlPath, function(error, mp3Data) {
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
