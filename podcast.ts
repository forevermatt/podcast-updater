declare var module: any;
declare var require: any;

var async = require('async'),
    Mp3Class = require('./mp3.js'),
    podcastWebpage = require('./podcast-webpage.js'),
    podcastXml = require('./podcast-xml.js');

class Podcast {

  private config;
  private htmlPath: string;
  private webpageBaseUrl: string;

  constructor(config) {
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

    if (config.htmlPath) {
      this.htmlPath = config.htmlPath;
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

  private getMp3Data(htmlPath, callback) {

    var podcast = this;
    var webpage = new podcastWebpage(htmlPath);
    webpage.getListOfMp3s(function(err, mp3s) {

      if (err) {
        return callback(new Error(err), null);
      }
      var baseUrl = podcast.getWebpageBaseUrl();

      mp3s.forEach(function(mp3: Mp3) {
        mp3.setBaseUrl(baseUrl);
      });

      async.each(mp3s, function(mp3, callback) {
        Mp3Class.getSizeOfMp3(mp3, function(error, size) {
          if (error) {
            return callback(error);
          }
          mp3.setSize(size);
          return callback();
        });
      }, function(err) {
        if (err) {
          return callback(new Error(err), null);
        }
        return callback(null, mp3s);
      });
    });
  }
}

module.exports = Podcast;
