declare var module: any;
declare var process: any;
declare var require: any;

var request = require('request');

class PodcastWebpage {

  private url: string;
  private html: string;

  constructor(url: string) {
    this.html = null;
    this.url = url;
  }

  /**
   * Retrieve the HTML of the webpage at the given URL.
   *
   * @param {string} url The URL of the desired webpage.
   * @param {Function} callback The callback function.
   */
  private getWebpageHtml(url: string, callback: Function) {

    // Set up a reference to this that can be used in the closure below.
    var podcastWebpage = this;

    request(
      {
        uri: url,
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
            'Error (' + response.statusCode + ') retrieving "' + url + '".'
          ), null);
        }

        return callback(null, body);
      }
    );
  };

  public getHtml(callback: Function) {
    if (this.html === null) {
      var podcastWebpage: PodcastWebpage = this;
      this.getWebpageHtml(this.url, function(error, data) {
        if (error) {
          return callback(error, null);
        }
        podcastWebpage.html = data;
        return callback(null, podcastWebpage.html);
      });
    } else {
      callback(null, this.html);
    }
  }

  public getMp3Links(callback: Function) {
    this.getHtml(function(error, html) {



      // TODO: Get all of the links to audio files. CSS: "a[href$='.mp3']



    })
  }
}

module.exports = PodcastWebpage;
