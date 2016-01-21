var js2xmlparser = require("js2xmlparser");
var PodcastXml = (function () {
    function PodcastXml(config, mp3DataByUrl) {
        this.config = config;
        this.mp3DataByUrl = mp3DataByUrl;
    }
    PodcastXml.prototype.getAsString = function (callback) {
        this.getXmlData(function (error, data) {
            if (error) {
                return callback(new Error(error), null);
            }
            console.log(js2xmlparser("rss", data));
        });
    };
    PodcastXml.prototype.getBaseUrl = function (fullUrl) {
        var lastSlashAt = fullUrl.lastIndexOf('/');
        if (lastSlashAt < 0) {
            throw new Error('Cannot extract base URl from "' + fullUrl + '"');
        }
        return fullUrl.substr(0, lastSlashAt + 1);
    };
    PodcastXml.prototype.getCategoryData = function (config) {
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
        }
        else {
            return null;
        }
    };
    PodcastXml.prototype.getImageData = function (config) {
        var result = {};
        if (config.image) {
            result["@"] = {
                "href": config.image
            };
            return result;
        }
        else {
            return null;
        }
    };
    PodcastXml.prototype.getMp3Duration = function (mp3Url) {
        return null;
    };
    PodcastXml.prototype.getMp3Size = function (mp3Url) {
        return null;
    };
    PodcastXml.prototype.getXmlData = function (callback) {
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
                "itunes:category": this.getCategoryData(this.config),
                "item": []
            }
        };
        var baseUrl = this.getBaseUrl(this.config.link);
        var dateRegex = /[0-9]{1,4}-[0-9]{1,2}-[0-9]{2,4}/;
        var podcastXml = this;
        Object.keys(this.mp3DataByUrl).forEach(function (url, index) {
            var dateRegexMatches = dateRegex.exec(podcastXml.mp3DataByUrl[url]);
            var dateString;
            var mp3Url = (baseUrl + url).replace(/ /g, '%20');
            if (dateRegexMatches.length > 0) {
                dateString = dateRegexMatches[0];
            }
            xmlData.channel.item.push({
                "title": podcastXml.mp3DataByUrl[url],
                "link": podcastXml.config.link,
                "guid": mp3Url,
                "description": podcastXml.mp3DataByUrl[url],
                "enclosure": {
                    "@": {
                        "url": mp3Url,
                        "length": podcastXml.getMp3Size(mp3Url),
                        "type": "audio/mpeg"
                    }
                },
                "category": "Podcasts",
                "pubDate": (new Date(dateString)).toUTCString(),
                "itunes:author": podcastXml.config.author,
                "itunes:explicit": podcastXml.config.explicit,
                "itunes:duration": podcastXml.getMp3Duration(mp3Url),
            });
        });
        return callback(null, xmlData);
    };
    return PodcastXml;
})();
module.exports = PodcastXml;
