
/**
 * Module Dependencies
 */

var Emitter = require('emitter');

var resolvers = {
  soundcloud: require('./resolvers/soundcloud'),
  dummy: require('./resolvers/dummy')
};

/**
 * Tom
 * @param  {Object} options
 * @return {Tom}
 *
 * @Events
 *   'play', 'pause', 'stop', 'track'
 */
var Tom = function(options) {
  var tom = this;

  this.currentTrack = null;
  this.trackQueue = [];

  if(!soundManager) throw new Error('Sound Manager2 Required');
  this.soundManager = soundManager;
  this.resolvers = {};

  this.onTrack = false;
  this.onStop = false;
  this.onPlay = false;
  this.onPause = false;
  this.onError = false;

  this.track = function(a, b, c) {
    return new Track(a, b, c);
  };

  var Track = this.Track = function(options) {

    if(typeof arguments[0] === 'string') {
      this.artist = arguments[0];
      if(arguments[2]) {
        this.album = arguments[1];
        this.title = arguments[2];
      } else {
        this.title = arguments[1];
      }
    } else {
      this.title = options.title;
      this.album = options.album;
      this.artist = options.artist;
    }

    return this;
  };

  Track.prototype.resolve = function(callback) {
    console.log('Track.resolve()');

    var track = this;
    return tom.resolve(this, function(err, results) {
      this.sources = results;
      callback(err, results);
    });
  };

  Track.prototype.play = function() {
    console.log('Track.play()');
    return tom.play(this);
  };

  return this;
};

Emitter(Tom.prototype);

/**
 * Search
 * @param  {String | Object}   options
 *         If a String is provided it'll be interpreted as they query
 *         options atrributes:
 *           query: String,
 *           type: // ['track', 'album', 'artist']
 * @param  {Function} callback (err, results)
 *                             results = {
 *                               tracks: [],
 *                               albums: [],
 *                               artists: []
 *                             }
 */
 Tom.prototype.search = function(options, callback) {
  if(typeof options == 'string') options = { query: options };
  callback(null, {
    artists: [],
    tracks: [],
    albums: []
  });
};

/**
 * Resolve a track
 * @param  {Object} options
 *         options = {
 *           title: String,
 *           album: String, // optional
 *           artist: String
 *         }
 * @return {Array}
 */
 Tom.prototype.resolve = function(track, callback) {
  console.log('Tom.resolve(track, callback)');
  var resolvers = Object.keys(this.resolvers);
  var results = [];

  for (var i = 0; i < resolvers.length; i++) {
    this.resolvers[resolvers[i]].resolve(track, function(err, moreResults) {
      moreResults = moreResults || [];
      for (var o = 0; o < moreResults.length; o++) {
        results.push(moreResults[o]);
      }
      if(i === resolvers.length - 1) {
        track.results = results;
        callback(null, results);
      }
    });
  }
};

/**
 * Try and play or resolve and play
 * @param  {Object} track Tom.Track
 * @return {[type]}         [description]
 */
 Tom.prototype.play = function(track) {
  console.log('Tom.play(track)', track);
  // Already Resolved
  if(track.results) {
    track.sound = this.soundManager.createSound({
      url: track.results.map(function(results) {
        return {
          type: results.mimetype,
          url: results.url
        };
      }),
      autoplay: true
    });
    this.soundManager.stopAll();
    track.sound.play();
    this.currentTrack = track;
  } else {
    this.resolve(track);
    this.soundManager.stopAll();
    this.play(track);
    this.currentTrack = track;
  }
};

Tom.prototype.registerResolver = function(name, resolver) {
  this.resolvers[name] = resolver;
};

Tom.prototype.use = function(name, options) {
  console.log('Tom.use(name, options)');
  this.registerResolver(name, new resolvers[name](options));
};

function createInstance() {
  return new Tom(arguments[0]);
}

module.exports = createInstance;
module.exports.Tom = Tom;
module.exports.resolvers = resolvers;