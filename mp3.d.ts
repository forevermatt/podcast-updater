declare var module: any;
declare class Mp3 {
    private url;
    private label;
    constructor(url: string, label: string);
    getDuration(): any;
    getSize(): any;
    getLabel(): string;
    getUrl(): string;
}
