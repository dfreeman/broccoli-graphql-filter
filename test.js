"use strict";

const assert = require("assert");
const fs = require("fs");
const { Builder } = require("broccoli");
const GraphQLFilter = require(".");

const FIXTURES_DIR = `${__dirname}/test/fixtures`;
const FIXTURES = fs.readdirSync(FIXTURES_DIR);

describe("File creation", function() {
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
