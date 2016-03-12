var async = require('async'), Mp3Class = require('./mp3.js'), podcastWebpage = require('./podcast-webpage.js'), podcastXml = require('./podcast-xml.js');
var Podcast = (function () {
    function Podcast(config) {
        this.config = config;
        podcastXml.validateConfig(this.config);
        if (!config.link) {
            throw new Error('Please either include a "link" property in your config.json. You ' +
                'can also (optionally) provide the path to a local cached copy of ' +
                'the HTML to avoid unnecessary HTTP requests.');
        }
        this.webpageBaseUrl = Podcast.getBaseUrl(config.link);
        if (config.htmlPath) {
            this.htmlPath = config.htmlPath;
        }
        else if (config.link) {
            this.htmlPath = config.link;
        }
    }
    Podcast.getBaseUrl = function (fullUrl) {
        var lastSlashAt = fullUrl.lastIndexOf('/');
        if (lastSlashAt < 0) {
            throw new Error('Cannot extract base URL from "' + fullUrl + '"');
        }
        return fullUrl.substr(0, lastSlashAt + 1);
    };
    Podcast.prototype.getWebpageBaseUrl = function () {
        return this.webpageBaseUrl;
    };
    Podcast.prototype.generateXml = function (callback) {
        var podcast = this;
        this.getMp3Data(this.htmlPath, function (error, mp3Data) {
            if (error) {
                return callback(new Error(error), null);
            }
            var pXml = new podcastXml(podcast.config, mp3Data);
            pXml.getAsString(callback);
        });
    };
    Podcast.prototype.getMp3Data = function (htmlPath, callback) {
        var podcast = this;
        var webpage = new podcastWebpage(htmlPath);
        webpage.getListOfMp3s(function (err, mp3s) {
            if (err) {
                return callback(new Error(err), null);
            }
            var baseUrl = podcast.getWebpageBaseUrl();
            mp3s.forEach(function (mp3) {
                mp3.setBaseUrl(baseUrl);
            });
            async.each(mp3s, function (mp3, callback) {
                Mp3Class.getSizeOfMp3(mp3, function (error, size) {
                    if (error) {
                        return callback(error);
                    }
                    mp3.setSize(size);
                    return callback();
                });
            }, function (err) {
                if (err) {
                    return callback(new Error(err), null);
                }
                return callback(null, mp3s);
            });
        });
    };
    return Podcast;
})();
module.exports = Podcast;
