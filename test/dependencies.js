'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('msb:dependencies', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/dependencies'))
      .on('end', done);
  });
  it('check dependencies', function () {
    assert.file('package.json');
    assert.jsonFileContent('package.json', {
      dependencies: {
        bunyan: '^1.8.0',
        express: '^4.13.4',
        msb: '^0.10.0',
        dotenv: '^2.0.0',
        request: '^2.69.0'
      },
      devDependencies: {
        mocha: '^2.4.5',
        supertest: '^1.2.0'
      }
    });
  });
});
