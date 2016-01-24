var podcastWebpage = require('./podcast-webpage.js');
var podcastXml = require('./podcast-xml.js');
var Podcast = (function () {
    function Podcast(config, htmlPath) {
        this.config = config;
        if (!config.link) {
            throw new Error('Please either include a "link" property in your config.json. You ' +
                'can also (optionally) provide the path to a local cached copy of ' +
                'the HTML to avoid unnecessary HTTP requests.');
        }
        this.webpageBaseUrl = Podcast.getBaseUrl(config.link);
        if (htmlPath) {
            this.htmlPath = htmlPath;
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
    Podcast.prototype.getMp3Data = function (path, callback) {
        var webpage = new podcastWebpage(path);
        webpage.getListOfMp3s(callback);
    };
    return Podcast;
})();
module.exports = Podcast;
