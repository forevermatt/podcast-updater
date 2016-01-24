var request = require('request');
var rfc822Date = require('rfc822-date');
var Mp3 = (function () {
    function Mp3(urlPath, label) {
        this.dateRegex = /[0-9]{1,4}[-/]{1}[0-9]{1,2}[-/]{1}[0-9]{1,4}/;
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
    Mp3.prototype.getDate = function () {
        if (this.getDateString()) {
            return new Date(this.getDateString());
        }
        else {
            return null;
        }
    };
    Mp3.prototype.getDateString = function () {
        if (this.dateString === undefined) {
            var dateRegexMatches = this.dateRegex.exec(this.getLabel());
            var dateString;
            if (dateRegexMatches.length > 0) {
                this.dateString = dateRegexMatches[0] + ' 12:00:00';
            }
            else {
                this.dateString = null;
            }
        }
        return this.dateString;
    };
    Mp3.prototype.getPubDate = function () {
        return rfc822Date(this.getDate());
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
