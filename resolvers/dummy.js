
/**
 * Tom.js Dummy Resolver
 */

module.exports = function() {

  var dummyResolver = this;

  function generateSongResponse (track) {
    if(Array.isArray(track)) return track.map(parseSongResponse);

    var result = {};

    result.title = 'The Best Song Ever';
    result.artist = 'The Artist Artist Ever';
    result.track = 2;
    result.album = 'The Best Album Ever';
    result.year = 2013;
    result.source = 'Dummy';
    result.url = 'http://www.tumblr.com/audio_file/burytheworries/6017068044/tumblr_lln25h6hfB1qb4udf?plead=please-dont-download-this-or-our-lawyers-wont-let-us-host-audio';
    result.mimetype = "audio/mpeg";
    result.bitrate = 128;
    result.duration = 63;
    result.score = 0.95;
    return result;

  }

  this.search = function(query, callback) {
    callback(null, [generateSongResponse()]);
  };

  this.resolve = function(query, callback) {
    this.search(query.artist + ' - ' + query.title, callback);
  };

  return this;
};