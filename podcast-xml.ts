declare var module: any;
declare var require: any;

var js2xmlparser = require("js2xmlparser"),
    rfc822Date = require('rfc822-date');

class PodcastXml {

  private config;
  private mp3Data;

  constructor(config, mp3Data) {
    this.config = config;
    this.mp3Data = mp3Data;
  }

  public getAsString(callback) {

    this.getXmlData(function(error, data) {
      if (error) {
        return callback(new Error(error), null);
      }

      return callback(null, js2xmlparser("rss", data));
    });
  }

  private getCategoryData(config) {
    var result = {};

    if (config.category) {
      result["@"] = {
        "text": config.category
      };

      if (config.subcategory) {
        result["itunes:category"] = {
          "@": {
            "text": config.subcategory
          }
        };
      }

      return result;
    } else {
      return null;
    }
  }

  private getImageData(config) {
    var result = {};

    if (config.image) {
      result["@"] = {
        "href": config.image
      };

      return result;
    } else {
      return null;
    }
  }

  public getXmlData(callback) {
    var now = new Date();
    var nowRfc822 = rfc822Date(now);
    var xmlData = {
      "@": {
        "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "version": "2.0"
      },
      "channel": {
        "title": this.config.title,
        "description": this.config.description,
        "link": this.config.link,
        "language": this.config.language || "en-us",
        "copyright": this.config.copyright || ("Copyright " + now.getFullYear()),
        "lastBuildDate": nowRfc822,
        "pubDate": nowRfc822,
        "docs": "http://blogs.law.harvard.edu/tech/rss",
        "webMaster": this.config.webMaster,
        "itunes:author": this.config.author,
        "itunes:owner": {
          "itunes:name": this.config.owner.name,
          "itunes:email": this.config.owner.email
        },
        "itunes:explicit": this.config.explicit,
        "itunes:image": this.getImageData(this.config),
        "itunes:category": this.getCategoryData(this.config),
        "item": []
      }
    };

    var podcastXml = this;

    this.mp3Data.sort(function(a, b) {
      return b.getDate() - a.getDate();
    });

    this.mp3Data.forEach(function(mp3: Mp3, index) {
      var mp3FullUrl = mp3.getFullUrl();
      xmlData.channel.item.push({
        "title": mp3.getLabel(),
        "link": podcastXml.config.link,
        "guid": mp3FullUrl,
        "description": mp3.getLabel(),
        "enclosure": {
          "@": {
            "url": mp3FullUrl,
            "length": mp3.getSize(),
            "type": "audio/mpeg"
          }
        },
        "category": "Podcasts",
        "pubDate": mp3.getPubDate(),
        "itunes:author": podcastXml.config.author,
        "itunes:explicit": podcastXml.config.explicit,
        "itunes:duration": mp3.getDuration(), // TODO: Can't do this here if async.
      });
    });

    return callback(null, xmlData);
  }
}

module.exports = PodcastXml;
