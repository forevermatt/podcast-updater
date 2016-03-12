declare var module: any;
declare var require: any;

var request = require('request');
var rfc822Date = require('rfc822-date');

class Mp3 {

  private baseUrl: string;
  private static dateRegex: RegExp = /[0-9]{1,4}[-/]{1}[0-9]{1,2}[-/]{1}[0-9]{1,4}/;
  private dateString: string;
  private label: string;
  private size: Number;
  private urlPath: string;

  constructor(urlPath: string, label: string) {
    this.urlPath = urlPath.trim();
    this.setLabel(label);
  }

  /**
   * TODO: Implement this.
   */
  public getDuration() {
    return null;
  }

  public getSize(): Number {
    return this.size;
  }

  public getLabel(): string {
    return this.label;
  }

  public getUrlPath(): string {
    return this.urlPath;
  }

  public getFullUrl(): string {
    var fullUrl;

    // If this MP3's URL is a relative path...
    if (this.urlPath.indexOf('http') < 0) {
      if ( ! this.baseUrl) {
        throw new Error(
          "This MP3's URL is a relative path and its base URL is unknown, so " +
          "we cannot determine its full URL."
        );
      }
      fullUrl = this.baseUrl + this.urlPath;
    } else {
      fullUrl = this.urlPath;
    }
    return fullUrl.replace(/ /g, '%20');
  }

  public getDate(): Date {
    if (this.getDateString()) {
      return new Date(this.getDateString());
    } else {
      return null;
    }
  }

  public getDateString(): string {
    if (this.dateString === undefined) {
      var dateRegexMatches = Mp3.dateRegex.exec(this.getLabel());
      var dateString: string;
      if (dateRegexMatches && dateRegexMatches.length > 0) {
        this.dateString = dateRegexMatches[0] + ' 12:00:00';
      } else {
        throw new Error('Unable to parse date from "' + this.getLabel() + '".');
      }
    }

    return this.dateString;
  }

  public getPubDate(): string {
    return rfc822Date(this.getDate());
  }

  public static getSizeOfMp3(mp3: Mp3, callback: Function) {
    request
      .head(mp3.getFullUrl())
      .on('response', function(response) {
        var numBytes = Number(response.headers['content-length']);
        return callback(null, numBytes);
      });
  }

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl.trim();
  }

  public setLabel(label: string) {
    this.label = label && label.trim();
  }

  public setSize(numBytes: Number) {
    this.size = numBytes;
  }
}

module.exports = Mp3;
