declare var module: any;
declare var require: any;

var podcastWebpage = require('./podcast-webpage.js');

class Podcast {

  constructor(config) {
    if (config.path === undefined) {
      throw new Error('Please provide a "path" property in your config.json.');
    }

    this.getMp3Data(config.path, function(error, mp3Data) {
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
