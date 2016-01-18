declare var module: any;
declare var require: any;

var podcastWebpage = require('./podcast-webpage.js');
var podcastXml = require('./podcast-xml.js');

class Podcast {

  private config;
  private htmlPath: string;

  constructor(config, htmlPath) {
    this.config = config;
    if (htmlPath) {
      this.htmlPath = htmlPath;
    } else if (config.link) {
      this.htmlPath = config.link;
    } else {
      throw new Error(
        'Please either provide an htmlPath or include a "link" property in ' +
        'your config.json.'
      );
    }
  }

  public generateXml(callback) {
    var podcast = this;
    this.getMp3Data(this.htmlPath, function(error, mp3Data) {
      if (error) {
        return callback(new Error(error), null);
      }

      var pXml = new podcastXml(podcast.config, mp3Data);
      pXml.getAsString(callback);
    });
  }

  private getMp3Data(path, callback) {
    var webpage = new podcastWebpage(path);
    webpage.getListOfMp3s(callback);
  }
}

module.exports = Podcast;
