declare var module: any;
//declare var require: any;

class Mp3 {

  private url: string;
  private label: string;

  constructor(url: string, label: string) {
    this.url = url;
    this.label = label.trim();
  }

  /**
   * TODO: Implement this.
   */
  public getDuration() {
    return null;
  }

  /**
   * TODO: Implement this.
   */
  public getSize() {
    return null;
  }

  public getLabel() {
    return this.label;
  }

  public getUrl() {
    return this.url;
  }
}

module.exports = Mp3;
