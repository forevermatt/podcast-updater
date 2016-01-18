declare var module: any;
//declare var require: any;

class PodcastXml {

  private config;
  private mp3Data;

  constructor(config, mp3Data) {
    this.config = config;
    this.mp3Data = mp3Data;
  }

  public getAsString(callback) {



    // TEMP
    console.log('config', this.config);
    console.log('mp3Data', this.mp3Data);



  }
}

module.exports = PodcastXml;
