var request = require('request');
var PodcastWebpage = (function () {
    function PodcastWebpage(url) {
        this.html = null;
        this.url = url;
    }
    PodcastWebpage.prototype.getWebpageHtml = function (url, callback) {
        var podcastWebpage = this;
        request({
            uri: url,
            method: 'GET',
            strictSSL: true,
            timeout: 10000
        }, function (error, response, body) {
            if (error) {
                return callback(new Error(error), null);
            }
            var statusCode = Number(response.statusCode);
            if ((statusCode < 200) || (statusCode >= 300)) {
                return callback(new Error('Error (' + response.statusCode + ') retrieving "' + url + '".'), null);
            }
            return callback(null, body);
        });
    };
    ;
    PodcastWebpage.prototype.getHtml = function (callback) {
        if (this.html === null) {
            var podcastWebpage = this;
            this.getWebpageHtml(this.url, function (error, data) {
                if (error) {
                    return callback(error, null);
                }
                podcastWebpage.html = data;
                return callback(null, podcastWebpage.html);
            });
        }
        else {
            callback(null, this.html);
        }
    };
    PodcastWebpage.prototype.getMp3Links = function (callback) {
        this.getHtml(function (error, html) {
        });
    };
    return PodcastWebpage;
})();
module.exports = PodcastWebpage;
