'use strict';

var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');

after(function () {
  rimraf.sync('test/temp/');
  rimraf.sync('tmp');
});

describe('File creation', function() {
  it('should compile .graphql files', function () {
    assert.equal(
      fs.readFileSync('test/expected/my-query.js', 'utf8'),
      fs.readFileSync('test/temp/my-query.js', 'utf8')
    );

    assert.equal(
      fs.readFileSync('test/expected/my-fragment.js', 'utf8'),
      fs.readFileSync('test/temp/my-fragment.js', 'utf8')
    );
  });
});