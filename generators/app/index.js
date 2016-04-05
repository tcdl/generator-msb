'use strict';
let yeoman = require('yeoman-generator');
let _ = require('lodash');
let chalk = require('chalk');
let yosay = require('yosay');
let path = require('path');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('githubAccount', {
      type: String,
      required: false,
      desc: 'GitHub username or organization'
    });
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
    }
  },

  prompting: {

    greeting: function () {
      this.log(yosay('Welcome to the ' + chalk.red('generator-msb') + ' generator!'));
    },

    askForMicroservice: function () {
      let done = this.async();

      let prompts = [{
        type: 'string',
        name: 'name',
        message: 'Microservice Name',
        default: path.basename(process.cwd()),
        filter: _.kebabCase,
        validate: function (str) {
          return str.length > 0;
        }
      }, {
        name: 'description',
        message: 'Description',
        when: !this.props.description,
        validate: function (str) {
          return str.length > 0;
        }
      }, {
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        when: !this.pkg.keywords,
        filter: function (words) {
          return words.split(/\s*,\s*/g);
        }
      }, {
        name: 'authorName',
        message: 'Author\'s Name',
        when: !this.props.authorName,
        default: this.user.git.name(),
        store: true
      }, {
        name: 'authorEmail',
        message: 'Author\'s Email',
        when: !this.props.authorEmail,
        default: this.user.git.email(),
        store: true
      }];

      this.prompt(prompts, function (props) {
        this.props = _.merge(this.props, props);
        done();
      }.bind(this));
    }
  },

  default: function () {
    this.composeWith('msb:editorconfig', {}, {local: require.resolve('../editorconfig')});
  },

  writing: function () {
    let currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    let pkg = _.merge({
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail
      },
      files: ['app'],
      main: 'app/index.js',
      private: true,
      keywords: []
    }, currentPkg);

    if (this.props.keywords) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function () {
    this.npmInstall();
  }
});
