let importRegex = /^#\s*import\s+(.*?)\s+from\s+(.*)/;
let legacyImportRegex = /^#import\s+(.*)/;

module.exports = function extractImports(source) {
  let lines = source.split("\n");
  let imports = [];
  for (let line of lines) {
    let match;
    if (match = importRegex.exec(line)) {
      let source = match[2];
      let bindings = match[1].split(/\s*,\s*/);
      if (bindings.length === 1 && bindings[0] === "*") {
        imports.push({ source });
      } else {
        validateBindings(bindings);
        imports.push({ source, bindings });
      }
    } else if (match = legacyImportRegex.exec(line)) {
      imports.push({ source: match[1] });
    }
  }
  return imports;
}

function validateBindings(bindings) {
  for (let binding of bindings) {
    if (binding === '*') {
      throw new Error("A '*' import must be the only binding");
    }

    if (!/^[a-z_][a-z0-9_]*$/i.test(binding)) {
      throw new Error(`Invalid import identifier: ${binding}`);
    }
  }
}
