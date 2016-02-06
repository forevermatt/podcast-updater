# Podcast Updater
TypeScript / JavaScript files to read a webpage of links to audio files and
generate a podcast XML file from that information.

## Usage
To use this from the command-line, clone this repo and run the following: 

    $ node path/to/podcast-updater/cli.js ./path/to/your/config.json

To use this as an npm package... 

1. Install it:  
   ```$ npm install podcast-updater```
2. Require it into your JS file:
   ```var podcastUpdater = require('podcast-updater');```
3. Pass the ```generatePodcastXml``` function a JS object of your config data, 
   along with a callback function:  
   ```podcastUpdater.generatePodcastXml(config, function(error, xml) { ... });```

You can see the ```cli.js``` file for a working example.

To run this from within an AWS Lambda function, see 
[Podcast Updater Lambda](https://github.com/forevermatt/podcast-updater-lambda).

## Config File
Since a podcast XML file requires more information than just names for and 
links to MP3 files, you will need to provide a ```config.json``` file. Here is 
a sample: 

    {
      "title": "Sample Podcast",
      "description": "A description of the podcast",
      "subtitle": "A subtitle for the podcast",
      "link": "http://sample.org/path/to/webpage-with-links-to-mp3s.html",
      "language": "en-us",
      "copyright": "Copyright 2016",
      "webMaster": "webmaster's-email@example.org (Webmaster's Name)",
      "author": "Podcast Author's Name",
      "owner": {
        "name": "Podcast Owner's Name",
        "email": "podcast-owner's-email@example.org"
      },
      "explicit": "No",
      "image": "http://example.org/path/to/image-for-the-podcast.jpg",
      "category": "Podcast Category",
      "subcategory": "Podcast Subcategory"
    }

**NOTE:** For some reason, the URLs in a podcast XML file need to use HTTP, not 
HTTPS, at least for some podcast software.

## License
This code is made available under the MIT license.
