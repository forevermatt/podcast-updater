declare var module: any;
declare var require: any;
declare var async: any, Mp3Class: any, podcastWebpage: any, podcastXml: any;
declare class Podcast {
    private config;
    private htmlPath;
    private webpageBaseUrl;
    constructor(config: any);
    static getBaseUrl(fullUrl: string): string;
    private getWebpageBaseUrl();
    generateXml(callback: any): void;
    private getMp3Data(htmlPath, callback);
}
