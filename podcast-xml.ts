declare var module: any;
declare var require: any;

var js2xmlparser = require("js2xmlparser");

class PodcastXml {

  private config;
  private mp3DataByUrl;

  constructor(config, mp3DataByUrl) {
    this.config = config;
    this.mp3DataByUrl = mp3DataByUrl;
  }

  public getAsString(callback) {

    this.getXmlData(function(error, data) {
      if (error) {
        return callback(new Error(error), null);
      }



      // TEMP
      console.log(js2xmlparser("rss", data));

      // TODO: Convert this JS object to an XML string.

    });
  }

  private getBaseUrl(fullUrl: string) {
    var lastSlashAt = fullUrl.lastIndexOf('/');
    if (lastSlashAt < 0) {
      throw new Error('Cannot extract base URl from "' + fullUrl + '"');
    }

    return fullUrl.substr(0, lastSlashAt + 1);
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

  /**
   * TODO: Implement this.
   */
  public getMp3Duration(mp3Url) {
    return null;
  }

  /**
   * TODO: Implement this.
   */
  public getMp3Size(mp3Url) {
    return null;
  }

  public getXmlData(callback) {
    var now = new Date();
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
        "lastBuildDate": now,
        "pubDate": now,
        "docs": "http://blogs.law.harvard.edu/tech/rss",
        "webMaster": this.config.webMaster,
        "itunes:author": this.config.author,
        "itunes:owner": {
          "itunes:name": this.config.owner.name,
          "itunes:email": this.config.owner.email
        },
        "itunes:explicit": this.config.explicit,
        "itunes:image": this.getImageData(this.config),
        "itunes:category": this.getCategoryData(this.config)
      },
      "item": []
    };

    var baseUrl = this.getBaseUrl(this.config.link);
    var dateRegex = /[0-9]{1,4}-[0-9]{1,2}-[0-9]{2,4}/;
    var podcastXml = this;

    Object.keys(this.mp3DataByUrl).forEach(function(url, index) {
      var dateRegexMatches = dateRegex.exec(podcastXml.mp3DataByUrl[url]);
      var dateString;
      if (dateRegexMatches.length > 0) {
        dateString = dateRegexMatches[0];
      }
      xmlData.item.push({
        "title": podcastXml.mp3DataByUrl[url],
        "link": podcastXml.config.link,
        "guid": baseUrl + url,
        "description": podcastXml.mp3DataByUrl[url],
        "enclosure": {
          "@": {
            "url": baseUrl + url,
            "length": podcastXml.getMp3Size(baseUrl + url), // TODO: Can't do this here if async.
            "type": "audio/mpeg"
          }
        },
        "category": "Podcasts",
        "pubDate": (new Date(dateString)).toUTCString(),
        "itunes:author": podcastXml.config.author,
        "itunes:explicit": podcastXml.config.explicit,
        "itunes:duration": podcastXml.getMp3Duration(baseUrl + url), // TODO: Can't do this here if async.
      });
    });

    return callback(null, xmlData);
  }
}

module.exports = PodcastXml;
