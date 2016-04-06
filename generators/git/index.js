'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Module name'
    });

    this.option('github-account', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    });
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  },

  writing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var repository = this.options.githubAccount + '/' + this.options.name;

    this.pkg.repository = this.pkg.repository || repository;

    this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
  },

  end: function () {
    this.spawnCommandSync('git', ['init'], {cwd: this.destinationPath()});

    var repoSSH = this.pkg.repository;
    if (this.pkg.repository && this.pkg.repository.indexOf('.git') === -1) {
      repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
    }
    this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
      cwd: this.destinationPath()
    });
  }
});
