declare var module: any;
declare class PodcastXml {
    private config;
    private mp3DataByUrl;
    constructor(config: any, mp3DataByUrl: any);
    getAsString(callback: any): void;
    private getBaseUrl(fullUrl);
    private getCategoryData(config);
    private getImageData(config);
    getMp3Duration(mp3Url: any): any;
    getMp3Size(mp3Url: any): any;
    getXmlData(callback: any): any;
}
