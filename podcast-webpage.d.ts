declare var module: any;
declare var process: any;
declare var require: any;
declare var entities: any, fs: any, htmlparser: any, request: any, select: any;
declare class PodcastWebpage {
    private url;
    private rawHtml;
    constructor(url: string);
    private getWebpageHtml(url, callback);
    getRawHtml(callback: Function): void;
    getHtmlDom(callback: Function): void;
    getMp3LinkTags(callback: Function): void;
    protected static getLinkText(link: any): any;
    getListOfMp3s(callback: Function): void;
    protected static isMp3LinkTag(linkTag: any): boolean;
    protected static stringEndsWith(haystack: string, needle: string): boolean;
}
