
describe('tom.js', function(){
  var tom;

  before(function(){
    soundManager.setup({
      url:'../soundmanager2/swf/'
    });
    tom = new Tom();
  });

  describe('search() by querysting', function(){
    it('respond with an appropriate object', function(done) {
      tom.search('Let\'s Get Together', function(error, results) {
        ({
          tracks: [{
            title: 'Let\'s Get Together',
            artist: 'Newton Faulkner',
            album: 'Hand Built By Robots'
          }],
          artists: [],
          albums: []
        }).should().equal(results);
      });
    });
  });

  describe('search() for track', function(){
    tom.search('Let\'s Get Together', function() {

    })
    it('respond with an appropriate object');
  });

  describe('search() for album', function(){
    it('respond with an array of users');
  });

  describe('search() for artist', function(){
    it('respond with an array of users');
  });

  describe('search() for artist, album, track', function(){
    it('respond with an array of users');
  });

});

describe('resolvers', function(){
  describe('soundcloud', function(){
    it('search');
  });
});

describe('charts', function(){
  describe('get providers', function(){
    it('search');
  });
});