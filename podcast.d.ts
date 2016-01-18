declare var module: any;
declare var require: any;
declare var podcastWebpage: any;
declare var podcastXml: any;
declare class Podcast {
    private config;
    private htmlPath;
    constructor(config: any, htmlPath: any);
    generateXml(callback: any): void;
    private getMp3Data(path, callback);
}
