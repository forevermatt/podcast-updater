declare var module: any;
declare var require: any;

var podcastWebpage = require('./podcast-webpage.js');
var podcastXml = require('./podcast-xml.js');

class Podcast {

  private config;
  private htmlPath: string;

  constructor(config, htmlPath) {
    this.config = config;

    if ( ! config.link) {
      throw new Error(
        'Please either include a "link" property in your config.json. You ' +
        'can also (optionally) provide the path to a local cached copy of ' +
        'the HTML to avoid unnecessary HTTP requests.'
      );
    }

    if (htmlPath) {
      this.htmlPath = htmlPath;
    } else if (config.link) {
      this.htmlPath = config.link;
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
