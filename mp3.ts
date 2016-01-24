declare var module: any;
declare var require: any;

var request = require('request');
var rfc822Date = require('rfc822-date');

class Mp3 {

  private baseUrl: string;
  private dateRegex: RegExp = /[0-9]{1,4}[-/]{1}[0-9]{1,2}[-/]{1}[0-9]{1,4}/;
  private dateString: string;
  private label: string;
  private size: Number;
  private urlPath: string;

  constructor(urlPath: string, label: string) {
    this.urlPath = urlPath.trim();
    this.label = label.trim();
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
    if ( ! this.baseUrl) {
      throw new Error(
        "This MP3's base URL is unknown, so we cannot determine its full URL."
      );
    }
    return (this.baseUrl + this.urlPath).replace(/ /g, '%20');
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
      var dateRegexMatches = this.dateRegex.exec(this.getLabel());
      var dateString: string;
      if (dateRegexMatches.length > 0) {
        this.dateString = dateRegexMatches[0] + ' 12:00:00';
      } else {
        this.dateString = null;
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

  public setSize(numBytes: Number) {
    this.size = numBytes;
  }
}

module.exports = Mp3;
