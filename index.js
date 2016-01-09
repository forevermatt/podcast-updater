
var PodcastWebpage = require('./podcast-webpage.js');

if (process.argv.length < 3) {
  throw new Error('Please specify a URL.');
}

var webpage = new PodcastWebpage(process.argv[2]);
webpage.getHtml(function(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
