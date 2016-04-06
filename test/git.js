'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('msb:git', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/git'))
      .withOptions({
        repositoryPath: 'yeoman/generator-node'
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
});
