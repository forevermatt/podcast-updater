declare var module: any;
declare var process: any;
declare var require: any;
declare var request: any;
declare class PodcastWebpage {
    private url;
    private html;
    constructor(url: string);
    private getWebpageHtml(url, callback);
    getHtml(callback: Function): void;
    getMp3Links(callback: Function): void;
}
