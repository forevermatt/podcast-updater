var PodcastXml = (function () {
    function PodcastXml(config, mp3Data) {
        this.config = config;
        this.mp3Data = mp3Data;
    }
    PodcastXml.prototype.getAsString = function (callback) {
        console.log('config', this.config);
        console.log('mp3Data', this.mp3Data);
    };
    return PodcastXml;
})();
module.exports = PodcastXml;
