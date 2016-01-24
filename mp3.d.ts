declare var module: any;
declare var require: any;
declare var request: any;
declare class Mp3 {
    private label;
    private size;
    private urlPath;
    constructor(urlPath: string, label: string);
    getDuration(): any;
    getSize(): Number;
    getLabel(): string;
    getUrlPath(): string;
    static getSizeOfMp3(mp3: Mp3, callback: Function): void;
    setSize(numBytes: Number): void;
}
