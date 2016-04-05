'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-msb:app', function () {
  before(function (done) {
    this.answers = {
      name: 'microservice',
      description: 'A microservice example',
      authorName: 'TCDL',
      authorEmail: 'info@tcdl.com',
      keywords: ['microservice', 'msb']
    };
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(this.answers)
      .on('end', done);
  });
  it('creates package.json', function () {
    assert.file('package.json');
    assert.jsonFileContent('package.json', {
      name: this.answers.name,
      version: '0.0.0',
      description: this.answers.description,
      author: {
        name: this.answers.authorName,
        email: this.answers.authorEmail
      },
      files: ['app'],
      keywords: this.answers.keywords,
      main: 'app/index.js'
    });
  });
});
