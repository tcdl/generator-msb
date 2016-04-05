'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }
});
