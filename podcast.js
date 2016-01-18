var podcastWebpage = require('./podcast-webpage.js');
var podcastXml = require('./podcast-xml.js');
var Podcast = (function () {
    function Podcast(config, htmlPath) {
        this.config = config;
        if (htmlPath) {
            this.htmlPath = htmlPath;
        }
        else if (config.link) {
            this.htmlPath = config.link;
        }
        else {
            throw new Error('Please either provide an htmlPath or include a "link" property in ' +
                'your config.json.');
        }
    }
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
