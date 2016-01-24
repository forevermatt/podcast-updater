declare var module: any;
declare var require: any;
declare var js2xmlparser: any, rfc822Date: any;
declare class PodcastXml {
    private config;
    private mp3Data;
    constructor(config: any, mp3Data: any);
    getAsString(callback: any): void;
    private getCategoryData(config);
    private getImageData(config);
    getXmlData(callback: any): any;
    static validateConfig(config: any): void;
}
