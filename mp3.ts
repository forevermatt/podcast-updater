declare var module: any;
//declare var require: any;

class Mp3 {

  private label: string;
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

  /**
   * TODO: Implement this.
   */
  public getSize() {
    return null;
  }

  public getLabel() {
    return this.label;
  }

  public getUrlPath(): string {
    return this.urlPath;
  }
}

module.exports = Mp3;
