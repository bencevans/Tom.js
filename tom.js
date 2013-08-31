(function(root){

// Detect free variables `exports`
var freeExports = typeof exports == 'object' && exports;

// Detect free variable `module`
var freeModule = typeof module == 'object' && module &&
  module.exports == freeExports && module;

// Detect free variable `global` and use it as `root`
var freeGlobal = typeof global == 'object' && global;
if (freeGlobal.global === freeGlobal) {
  root = freeGlobal;
}

/**
 * Check for dependencies
 */

if(typeof soundManager == 'undefined') {
  if(require) {
    var $ = require('uniba/sound-manager-2');
  } else {
    throw new Error('Tom requires SoundManager2 (http://www.schillmania.com/projects/soundmanager2/)');
  }
}


/**
 * Tom
 * @param  {Object} options
 * @return {Tom}
 */
var Tom = function(options) {
  var tom = this;

  this.currentTrack = null;
  this.trackQueue = [];
  this.soundManager = soundManager;
  this.resolvers = {};

  this.onTrack;
  this.onStop;
  this.onPlay;
  this.onPause;
  this.onError;

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
      if(i === resolvers.length) {
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

// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if (
  typeof define == 'function' &&
  typeof define.amd == 'object' &&
  define.amd
) {
  define(function() {
    return Tom;
  });
} else if (freeExports && !freeExports.nodeType) {
  if (freeModule) { // in Node.js or RingoJS v0.8.0+
    freeModule.exports = Tom;
  } else { // in Narwhal or RingoJS v0.7.0-
    for (var key in Tom) {
      Tom.hasOwnProperty(key) && (freeExports[key] = Tom[key]);
    }
  }
} else { // in Rhino or a web browser
  root.Tom = Tom;
}

})(this);