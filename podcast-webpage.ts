declare var module: any;
declare var process: any;
declare var require: any;

var entities = require("entities"),
    fs = require('fs'),
    htmlparser = require("htmlparser"),
    request = require('request'),
    select = require('soupselect').select;

class PodcastWebpage {

  private htmlPath: string;
  private rawHtml: string;

  constructor(htmlPath: string) {
    this.rawHtml = null;
    this.htmlPath = htmlPath;
  }

  /**
   * Retrieve the HTML at the specified path.
   *
   * @param {string} htmlPath The path to the HTML. If it appears to be a URL,
   *     it will be retrieved via a GET request. Otherwise, it will be treated
   *     as a local filesystem path.
   * @param {Function} callback The callback function.
   */
  private getWebpageHtml(htmlPath: string, callback: Function) {

    // Set up a reference to this that can be used in the closure below.
    var podcastWebpage = this;

    if (htmlPath.indexOf('http') < 0) {
      fs.readFile(htmlPath, 'utf8', function(error, data) {
        return callback(null, data);
      });
    } else {
      request(
        {
          uri: htmlPath,
          method: 'GET',
          strictSSL: true,
          timeout: 10000 // Timeout in milliseconds.
        },
        function(error, response, body) {
          if (error) {
            return callback(new Error(error), null);
          }

          var statusCode: number = Number(response.statusCode);

          if ((statusCode < 200) || (statusCode >= 300)) {
            return callback(new Error(
              'Error (' + response.statusCode + ') retrieving "' + htmlPath + '".'
            ), null);
          }

          return callback(null, body);
        }
      );
    }
  };

  public getRawHtml(callback: Function) {
    if (this.rawHtml === null) {
      var podcastWebpage: PodcastWebpage = this;
      this.getWebpageHtml(this.htmlPath, function(error, data) {
        if (error) {
          return callback(error, null);
        }
        podcastWebpage.rawHtml = data;
        return callback(null, podcastWebpage.rawHtml);
      });
    } else {
      callback(null, this.rawHtml);
    }
  }

  public getHtmlDom(callback: Function) {
    this.getRawHtml(function(error, rawHtml) {
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
  }

  // protected static getLinkTags(dom) {
  //   var linkTags = [];
  //   if (dom instanceof Array) {
  //     for (var i = 0; i < dom.length; i++) {
  //       linkTags = linkTags.concat(PodcastWebpage.getLinkTags(dom[i]));
  //     }
  //   } else {
  //     if (dom.type === 'tag') {
  //       if (dom.name === 'a') {
  //         linkTags.push(dom);
  //       }
  //       if (dom.children) {
  //         for (var j = 0; j < dom.children.length; j++) {
  //           linkTags = linkTags.concat(PodcastWebpage.getLinkTags(dom.children[j]));
  //         }
  //       }
  //     }
  //   }
  //   return linkTags;
  // }

  public getMp3LinkTags(callback: Function) {
    this.getHtmlDom(function(error, htmlDom) {
      if (error) {
        return callback(new Error(error), null);
      }
      //var linkTags = PodcastWebpage.getLinkTags(htmlDom);
      var linkTags = select(htmlDom, 'a');
      var mp3LinkTags = linkTags.filter(function(linkTag) {
        return PodcastWebpage.isMp3LinkTag(linkTag);
      });
      return callback(null, mp3LinkTags);
    })
  }

  protected static getLinkText(link) {
    return entities.decodeHTML(entities.decodeXML(link.children[0].data));
  }

  public getListOfMp3s(callback: Function) {
    this.getMp3LinkTags(function(error, mp3LinkTags) {
      if (error) {
        return callback(new Error(error), null);
      }
      var label, url;
      var mp3LabelsByUrl = {};
      mp3LinkTags.forEach(function(mp3LinkTag, index, array) {
        url = entities.decodeXML(mp3LinkTag.attribs.href);
        label = PodcastWebpage.getLinkText(mp3LinkTag);
        if (mp3LabelsByUrl[url]) {
          if (mp3LabelsByUrl[url].indexOf(label.trim()) < 0) {
            mp3LabelsByUrl[url] += ' ' + label.trim();
          }
        } else {
          mp3LabelsByUrl[url] = label.trim();
        }
      });

      return callback(null, mp3LabelsByUrl);
    })
  }

  protected static isMp3LinkTag(linkTag) {
    if (linkTag && linkTag.attribs && linkTag.attribs.href) {
      return PodcastWebpage.stringEndsWith(linkTag.attribs.href, '.mp3');
    }
    return false;
  }

  protected static stringEndsWith(haystack: string, needle: string) {
    return haystack.indexOf(needle, haystack.length - needle.length) !== -1;
  }
}

module.exports = PodcastWebpage;
