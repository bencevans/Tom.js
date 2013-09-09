# Tom.js

Multi-Source Music Resolver.

## Installation

    Setup [SoundManager2](www.schillmania.com/projects/soundmanager2/)

    $ component install bencevans/Tom.js

## Usage

```js
var Tom = require('Tom.js');
var tom = Tom();

tom.use('soundcloud', 'SOUNDLCOUD_APP_KEY');

tom.on('play', function(track) {
  console.log('Enjoy listening to ' + track.title + ' by ' + track.artist);
  // Update play icons
});

tom.on('pause', function(error) {
  // Update play icons
});

tom.on('stop', function(error) {
  // Update play icons
});

tom.on('error', function(error) {
  console.log('Tom Internal Error:', error);
});

tom.track('Newton Faulkner', 'Lullaby').resolve(function(err, results) {
  if(err) return alert('Damnnnnnnn');
  console.log('asd');
  track.play();
});
```

## Licence

MIT
