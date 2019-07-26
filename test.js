"use strict";

const assert = require("assert");
const fs = require("fs");
const { stripIndent } = require("common-tags");
const { Builder } = require("broccoli");

const GraphQLFilter = require(".");
const extractImports = require("./lib/extract-imports");

const FIXTURES_DIR = `${__dirname}/test/fixtures`;
const FIXTURES = fs.readdirSync(FIXTURES_DIR);

describe("Acceptance | File creation", function() {
  for (let fixture of FIXTURES) {
    describe(fixture, function() {
      const cwd = `${FIXTURES_DIR}/${fixture}`;
      const options = fs.existsSync(`${cwd}/options.json`)
        ? require(`${cwd}/options.json`)
        : {};

      const builder = new Builder(new GraphQLFilter(`${cwd}/input`, options))

      before(function() {
        return builder.build();
      });

      after(function() {
        return builder.cleanup();
      });

      it("compiles files correctly", function() {
        let actualFiles = fs.readdirSync(builder.outputPath).sort();
        let expectedFiles = fs.readdirSync(`${cwd}/expected`).sort();

        assert.deepEqual(actualFiles, expectedFiles);

        for (let file of expectedFiles) {
          assert.equal(
            fs.readFileSync(`${builder.outputPath}/${file}`, "utf-8"),
            fs.readFileSync(`${cwd}/expected/${file}`, "utf-8"),
            `${file} was transpiled correctly`
          );
        }
      });
    });
  }
});

describe("Unit | extractImports", function() {
  it("extracts * imports", function() {
    let source = stripIndent`
      # import * from "./foo"
    `;

    assert.deepEqual(extractImports(source, 'test.gql'), [
      { source: `"./foo"` }
    ]);
  });

  it("extracts named imports", function() {
    let source = stripIndent`
      # import Foo, Bar from "./baz"
    `;

    assert.deepEqual(extractImports(source, 'test.gql'), [
      { source: `"./baz"`, bindings: ["Foo", "Bar"] }
    ]);
  });

  it("extracts legacy-format imports", function() {
    let source = stripIndent`
      #import "./foo"
    `;

    assert.deepEqual(extractImports(source, 'test.gql'), [
      { source: `"./foo"` }
    ]);
  });

  it("extracts all imports", function() {
    let source = stripIndent`
      # import * from "./foo"
      # import Bar from "baz"
    `;

    assert.deepEqual(extractImports(source, 'test.gql'), [
      { source: `"./foo"` },
      { source: `"baz"`, bindings: ["Bar"] }
    ]);
  });

  it("rejects invalid import specifiers", function() {
    let source = stripIndent`
      # import Foo, * from "./foo"
    `;

    assert.throws(
      () => extractImports(source, 'test.gql'),
      new Error("A '*' import must be the only binding")
    );
  });

  it("rejects invalid identifiers", function() {
    let source = stripIndent`
      # import foo-bar from "./foo"
    `;

    assert.throws(
      () => extractImports(source, 'test.gql'),
      new Error("Invalid import identifier: foo-bar")
    );
  });
});
