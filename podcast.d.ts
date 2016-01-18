declare var module: any;
declare var require: any;
declare var podcastWebpage: any;
declare class Podcast {
    constructor(config: any, htmlPath: any);
    private getMp3Data(path, callback);
}
