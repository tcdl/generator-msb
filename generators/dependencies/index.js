'use strict';
let generators = require('yeoman-generator');
let _ = require('lodash');

module.exports = generators.Base.extend({
  writing: function () {
    let dependencies = {
      bunyan: '^1.8.0',
      express: '^4.13.4',
      msb: '^0.10.0',
      dotenv: '^2.0.0',
      request: '^2.69.0'
    };
    dependencies["bunyan-logstash"] = '^0.3.4';
    dependencies["body-parser"] = '^1.15.0';

    let devDependencies = {
      mocha: '^2.4.5',
      supertest: '^1.2.0'
    };

    let currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    currentPkg.dependencies = _.merge(dependencies, currentPkg.dependencies);
    currentPkg.devDependencies = _.merge(devDependencies, currentPkg.devDependencies);

    this.fs.writeJSON(this.destinationPath('package.json'), currentPkg);
  }
});
