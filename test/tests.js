
describe('Tom.js', function(){
  var Tom, tom;

  before(function(){

    Tom = require('Tom.js');
    tom = new Tom();

    tom.registerResolver('dummy', new Tom.resolvers.dummy());

  });

  describe('search() for track', function(){

    it('should return null err & array of results', function(done) {

      var track = new tom.Track('Newton Faulkner', 'Let\'s Get Together');
      track.resolve(function(err, results) {
        assert.equal(null, err);
        assert.ok(Array.isArray(results));
        done();
      });
    });
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