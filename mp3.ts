declare var module: any;
declare var require: any;

var request = require('request');

class Mp3 {

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

  public getLabel() {
    return this.label;
  }

  public getUrlPath(): string {
    return this.urlPath;
  }

  public static getSizeOfMp3(mp3: Mp3, callback: Function) {
    request
      .head(mp3.getFullUrl())
      .on('response', function(response) {
        var numBytes = Number(response.headers['content-length']);
        return callback(null, numBytes);
      });
  }

  public setSize(numBytes: Number) {
    this.size = numBytes;
  }
}

module.exports = Mp3;
