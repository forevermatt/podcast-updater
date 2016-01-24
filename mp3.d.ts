declare var module: any;
declare var require: any;
declare var request: any;
declare class Mp3 {
    private baseUrl;
    private label;
    private size;
    private urlPath;
    constructor(urlPath: string, label: string);
    getDuration(): any;
    getSize(): Number;
    getLabel(): string;
    getUrlPath(): string;
    getFullUrl(): string;
    static getSizeOfMp3(mp3: Mp3, callback: Function): void;
    setBaseUrl(baseUrl: string): void;
    setSize(numBytes: Number): void;
}
