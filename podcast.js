var podcastWebpage = require('./podcast-webpage.js');
var Podcast = (function () {
    function Podcast(config) {
        if (config.htmlPath === undefined) {
            throw new Error('Please provide an "htmlPath" property in your config.json.');
        }
        this.getMp3Data(config.htmlPath, function (error, mp3Data) {
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
