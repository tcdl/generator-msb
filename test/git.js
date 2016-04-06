'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('msb:git', function () {
  this.timeout(10000);
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/git'))
      .withOptions({
        name: 'microservice',
        githubAccount: 'tcdl',
        submodule: 'https://github.com/tcdl/msb-newrelic.git'
      })
      .on('end', done);
  });

  it('creates .gitignore', function () {
    assert.file('.gitignore');
  });

  it('creates .gitattributes', function () {
    assert.file('.gitattributes');
  });

  it('initialize git repository', function () {
    assert.file('.git');
  });

  it('add submodule', function () {
    assert.file('spec');
  });
});
