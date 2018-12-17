'use strict';

const Filter = require('broccoli-persistent-filter');
const gql = require('graphql-tag');

gql.disableFragmentWarnings();

module.exports = class GraphQLFilter extends Filter {
  constructor(inputNode, { keepExtension = false, ...options }) {
    super(inputNode, options);
    this.targetExtension = keepExtension ? null : 'js';
    this.extensions = ['graphql', 'gql'];
  }

  getDestFilePath(relativePath) {
    const newPath = super.getDestFilePath(relativePath);
    if (!newPath || this.targetExtension) {
      return newPath;
    }

    return `${newPath}.js`;
  }

  processString(source) {
    let output = [
      `const doc = ${JSON.stringify(gql([source]), null, 2)};`,
      `export default doc;`
    ];

    source.split('\n').forEach((line, i) => {
      let match = /^#import\s+(.*)/.exec(line);
      if (match && match[1]) {
        output.push(`import dep${i} from ${match[1]};`);
        output.push(
          `doc.definitions = doc.definitions.concat(dep${i}.definitions);`
        );
      }
    });

    return output.join('\n') + '\n';
  }
};
