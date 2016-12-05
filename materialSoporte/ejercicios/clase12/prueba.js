var chai = require('chai');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      chai.assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
  describe('#slice()', function() {
    it('should return [2,3] when args are (1,3)', function() {
      chai.assert.deepEqual([2,3], [1,2,3].slice(1,3));
    });
  });
  describe('#slice() - Error', function() {
    it('should return [2,4] when args are (1,3)', function() {
      chai.assert.deepEqual([2,4], [1,2,3].slice(1,3));
    });
  });
});
