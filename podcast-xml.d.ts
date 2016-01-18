declare var module: any;
declare class PodcastXml {
    private config;
    private mp3DataByUrl;
    constructor(config: any, mp3DataByUrl: any);
    getAsString(callback: any): void;
    private getBaseUrl(fullUrl);
    private getCategoryData(config);
    private getImageData(config);
    getXmlData(callback: any): {
        "@": {
            "xmlns:itunes": string;
            "version": string;
        };
        "channel": {
            "title": any;
            "description": any;
            "link": any;
            "language": any;
            "copyright": any;
            "lastBuildDate": Date;
            "pubDate": Date;
            "docs": string;
            "webMaster": any;
            "itunes:author": any;
            "itunes:owner": {
                "itunes:name": any;
                "itunes:email": any;
            };
            "itunes:explicit": any;
            "itunes:image": {};
            "itunes:category": {};
        };
        "item": any[];
    };
}
