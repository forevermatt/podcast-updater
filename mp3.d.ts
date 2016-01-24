declare var module: any;
declare var require: any;
declare var request: any;
declare var rfc822Date: any;
declare class Mp3 {
    private baseUrl;
    private dateRegex;
    private dateString;
    private label;
    private size;
    private urlPath;
    constructor(urlPath: string, label: string);
    getDuration(): any;
    getSize(): Number;
    getLabel(): string;
    getUrlPath(): string;
    getFullUrl(): string;
    getDate(): Date;
    getDateString(): string;
    getPubDate(): string;
    static getSizeOfMp3(mp3: Mp3, callback: Function): void;
    setBaseUrl(baseUrl: string): void;
    setSize(numBytes: Number): void;
}
