declare var module: any;
declare var process: any;
declare var require: any;
declare var entities: any, fs: any, htmlparser: any, request: any, select: any;
declare class PodcastWebpage {
    private htmlPath;
    private rawHtml;
    constructor(htmlPath: string);
    private getWebpageHtml(htmlPath, callback);
    getRawHtml(callback: Function): void;
    getHtmlDom(callback: Function): void;
    getMp3LinkTags(callback: Function): void;
    protected static getLinkText(link: any): any;
    getListOfMp3s(callback: Function): void;
    protected static isMp3LinkTag(linkTag: any): boolean;
    protected static stringEndsWith(haystack: string, needle: string): boolean;
}
