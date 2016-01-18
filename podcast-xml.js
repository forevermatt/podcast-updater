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
            console.log(data);
        });
    };
    PodcastXml.prototype.getBaseUrl = function (fullUrl) {
        return "";
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
                "itunes:category": this.getCategoryData(this.config)
            },
            "item": []
        };
        var baseUrl = this.getBaseUrl(this.config.link);
        var dateRegex = /[0-9]{1,4}-[0-9]{1,2}-[0-9]{2,4}/;
        Object.keys(this.mp3DataByUrl).forEach(function (url, index) {
            var dateRegexMatches = dateRegex.exec(this.mp3DataByUrl[url]);
            var dateString;
            if (dateRegexMatches.length > 0) {
                dateString = dateRegexMatches[0];
            }
            xmlData.item.push({
                "title": this.mp3DataByUrl[url],
                "link": this.config.link,
                "guid": baseUrl + url,
                "description": this.mp3DataByUrl[url],
                "enclosure": {
                    "@": {
                        "url": baseUrl + url,
                        "length": this.getMp3Size(baseUrl + url),
                        "type": "audio/mpeg"
                    }
                },
                "category": "Podcasts",
                "pubDate": new Date(dateString),
                "itunes:author": "",
                "itunes:explicit": "",
                "itunes:duration": "",
            });
        });
        return xmlData;
    };
    return PodcastXml;
})();
module.exports = PodcastXml;
