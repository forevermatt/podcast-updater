var podcastWebpage = require('./podcast-webpage.js');
var Podcast = (function () {
    function Podcast(config, htmlPath) {
        var htmlPathToUse;
        if (htmlPath) {
            htmlPathToUse = htmlPath;
        }
        else if (config.link) {
            htmlPathToUse = config.link;
        }
        else {
            throw new Error('Please either provide an htmlPath or include a "link" property in ' +
                'your config.json.');
        }
        this.getMp3Data(htmlPathToUse, function (error, mp3Data) {
            if (error) {
                console.error(error);
            }
            else {
                console.log(mp3Data);
            }
        });
    }
    Podcast.prototype.getMp3Data = function (path, callback) {
        var webpage = new podcastWebpage(path);
        webpage.getListOfMp3s(callback);
    };
    return Podcast;
})();
module.exports = Podcast;
