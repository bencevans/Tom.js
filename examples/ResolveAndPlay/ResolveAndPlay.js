var Tom = require('Tom.js');
var tom = Tom();

tom.use('soundcloud', '6b93ba11bbb049684fc149cdadb848ac');

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
