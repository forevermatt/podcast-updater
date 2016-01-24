declare var module: any;
declare class Mp3 {
    private label;
    private urlPath;
    constructor(urlPath: string, label: string);
    getDuration(): any;
    getSize(): any;
    getLabel(): string;
    getUrlPath(): string;
}
