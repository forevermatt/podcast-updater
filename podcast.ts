declare var module: any;
declare var require: any;

var podcastWebpage = require('./podcast-webpage.js');
var podcastXml = require('./podcast-xml.js');

class Podcast {

  private config;
  private htmlPath: string;
  private webpageBaseUrl: string;

  constructor(config, htmlPath) {
    this.config = config;

    podcastXml.validateConfig(this.config);

    if ( ! config.link) {
      throw new Error(
        'Please either include a "link" property in your config.json. You ' +
        'can also (optionally) provide the path to a local cached copy of ' +
        'the HTML to avoid unnecessary HTTP requests.'
      );
    }

    this.webpageBaseUrl = Podcast.getBaseUrl(config.link);

    if (htmlPath) {
      this.htmlPath = htmlPath;
    } else if (config.link) {
      this.htmlPath = config.link;
    }
  }

  public static getBaseUrl(fullUrl: string): string {
    var lastSlashAt = fullUrl.lastIndexOf('/');
    if (lastSlashAt < 0) {
      throw new Error('Cannot extract base URL from "' + fullUrl + '"');
    }

    return fullUrl.substr(0, lastSlashAt + 1);
  }

  private getWebpageBaseUrl() {
    return this.webpageBaseUrl;
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
