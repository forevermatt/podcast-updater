declare var module: any;
declare var require: any;
declare var podcastWebpage: any;
declare var podcastXml: any;
declare class Podcast {
    private config;
    private htmlPath;
    private webpageBaseUrl;
    constructor(config: any, htmlPath: any);
    static getBaseUrl(fullUrl: string): string;
    private getWebpageBaseUrl();
    generateXml(callback: any): void;
    private getMp3Data(path, callback);
}
