var request = require('request');
var Mp3 = (function () {
    function Mp3(urlPath, label) {
        this.urlPath = urlPath.trim();
        this.label = label.trim();
    }
    Mp3.prototype.getDuration = function () {
        return null;
    };
    Mp3.prototype.getSize = function () {
        return this.size;
    };
    Mp3.prototype.getLabel = function () {
        return this.label;
    };
    Mp3.prototype.getUrlPath = function () {
        return this.urlPath;
    };
    Mp3.prototype.getFullUrl = function () {
        if (!this.baseUrl) {
            throw new Error("This MP3's base URL is unknown, so we cannot determine its full URL.");
        }
        return (this.baseUrl + this.urlPath).replace(/ /g, '%20');
    };
    Mp3.getSizeOfMp3 = function (mp3, callback) {
        request
            .head(mp3.getFullUrl())
            .on('response', function (response) {
            var numBytes = Number(response.headers['content-length']);
            return callback(null, numBytes);
        });
    };
    Mp3.prototype.setBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl.trim();
    };
    Mp3.prototype.setSize = function (numBytes) {
        this.size = numBytes;
    };
    return Mp3;
})();
module.exports = Mp3;
