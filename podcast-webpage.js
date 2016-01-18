var entities = require("entities"), fs = require('fs'), htmlparser = require("htmlparser"), request = require('request'), select = require('soupselect').select;
var PodcastWebpage = (function () {
    function PodcastWebpage(url) {
        this.rawHtml = null;
        this.url = url;
    }
    PodcastWebpage.prototype.getWebpageHtml = function (url, callback) {
        var podcastWebpage = this;
        if (url.indexOf('http') < 0) {
            fs.readFile(url, 'utf8', function (error, data) {
                return callback(null, data);
            });
        }
        else {
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
        }
    };
    ;
    PodcastWebpage.prototype.getRawHtml = function (callback) {
        if (this.rawHtml === null) {
            var podcastWebpage = this;
            this.getWebpageHtml(this.url, function (error, data) {
                if (error) {
                    return callback(error, null);
                }
                podcastWebpage.rawHtml = data;
                return callback(null, podcastWebpage.rawHtml);
            });
        }
        else {
            callback(null, this.rawHtml);
        }
    };
    PodcastWebpage.prototype.getHtmlDom = function (callback) {
        this.getRawHtml(function (error, rawHtml) {
            if (error) {
                return callback(new Error(error), null);
            }
            var handler = new htmlparser.DefaultHandler(function (error, dom) {
                if (error) {
                    return callback(new Error(error), null);
                }
                return callback(null, handler.dom);
            }, {
                verbose: false,
                ignoreWhitespace: true
            });
            var parser = new htmlparser.Parser(handler);
            parser.parseComplete(rawHtml);
        });
    };
    PodcastWebpage.prototype.getMp3LinkTags = function (callback) {
        this.getHtmlDom(function (error, htmlDom) {
            if (error) {
                return callback(new Error(error), null);
            }
            var linkTags = select(htmlDom, 'a');
            var mp3LinkTags = linkTags.filter(function (linkTag) {
                return PodcastWebpage.isMp3LinkTag(linkTag);
            });
            return callback(null, mp3LinkTags);
        });
    };
    PodcastWebpage.getLinkText = function (link) {
        return entities.decodeHTML(entities.decodeXML(link.children[0].data));
    };
    PodcastWebpage.prototype.getListOfMp3s = function (callback) {
        this.getMp3LinkTags(function (error, mp3LinkTags) {
            if (error) {
                return callback(new Error(error), null);
            }
            var label, url;
            var mp3LabelsByUrl = {};
            mp3LinkTags.forEach(function (mp3LinkTag, index, array) {
                url = entities.decodeXML(mp3LinkTag.attribs.href);
                label = PodcastWebpage.getLinkText(mp3LinkTag);
                if (mp3LabelsByUrl[url]) {
                    if (mp3LabelsByUrl[url].indexOf(label.trim()) < 0) {
                        mp3LabelsByUrl[url] += ' ' + label.trim();
                    }
                }
                else {
                    mp3LabelsByUrl[url] = label.trim();
                }
            });
            return callback(null, mp3LabelsByUrl);
        });
    };
    PodcastWebpage.isMp3LinkTag = function (linkTag) {
        if (linkTag && linkTag.attribs && linkTag.attribs.href) {
            return PodcastWebpage.stringEndsWith(linkTag.attribs.href, '.mp3');
        }
        return false;
    };
    PodcastWebpage.stringEndsWith = function (haystack, needle) {
        return haystack.indexOf(needle, haystack.length - needle.length) !== -1;
    };
    return PodcastWebpage;
})();
module.exports = PodcastWebpage;
