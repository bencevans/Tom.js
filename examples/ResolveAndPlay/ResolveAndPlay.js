var Tom = require('Tom.js');
var tom = Tom();

tom.use('soundcloud', '6b93ba11bbb049684fc149cdadb848ac');

tom.on('track', function() {
  console.log('aos;dijasidfjasf: track');
})

tom.on('play', function(track) {
  console.log('Enjoy listening to ' + track.title + ' by ' + track.artist);
  // Update play icons
});

tom.on('pause', function() {
  console.log('aos;dijasidfjasf: pause');
});

tom.on('stop', function() {
  console.log('aos;dijasidfjasf: stop');
});

tom.on('error', function(error) {
  console.log('Tom Internal Error:', error);
});

var track = tom.track('Newton Faulkner', 'Lullaby');
track.resolve(function(err, results) {
  if(err) return alert('Damnnnnnnn');
  console.log('asd');
  track.play();
});
