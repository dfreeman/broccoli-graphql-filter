'use strict';

const Filter = require('broccoli-filter');

module.exports = class GraphqlFilter extends Filter {
  constructor(inputNode, options) {
    super(inputNode, options);
    this.extensions = ['graphql'];
    this.targetExtension = 'js';
  }

  processString(content, relativePath) {
    let lines = [
      'const text = `',
      ...content.split('\n'),
      '`;',
      'export default text;',
      ''
    ];
    return lines.join('\n');
  }
};
