"use strict";

const Filter = require("broccoli-persistent-filter");
const gql = require("graphql-tag");
const extractImports = require("./lib/extract-imports");

gql.disableFragmentWarnings();

module.exports = class GraphQLFilter extends Filter {
  constructor(inputNode, options = {}) {
    super(inputNode, options);
    this.targetExtension = options.keepExtension ? null : "js";
    this.extensions = ["graphql", "gql"];
  }

  getDestFilePath(relativePath, entry) {
    const newPath = super.getDestFilePath(relativePath, entry);
    if (!newPath || this.targetExtension) {
      return newPath;
    }

    return `${newPath}.js`;
  }

  processString(source, relativePath) {
    let output = [
      `const doc = ${JSON.stringify(gql([source]), null, 2)};`,
      `export default doc;`
    ];

    extractImports(source, relativePath).forEach((directive, i) => {
      let definitions = `dep${i}.definitions`;
      if (directive.bindings) {
        let matcher = `/^(${directive.bindings.join("|")})$/`;
        definitions = `${definitions}.filter(def => ${matcher}.test(def.name.value))`;
      }

      output.push(`import dep${i} from ${directive.source};`);
      output.push(`doc.definitions = doc.definitions.concat(${definitions});`);
    });

    return output.join("\n") + "\n";
  }
};
