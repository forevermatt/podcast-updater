declare var module: any;
declare class PodcastXml {
    private config;
    private mp3Data;
    constructor(config: any, mp3Data: any);
    getAsString(callback: any): void;
}
