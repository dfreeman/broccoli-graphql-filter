'use strict';

const assert = require('assert');
const { resolve } = require('path');
const fs = require('fs').promises;
const { Builder } = require('broccoli');
const GraphQLFilter = require('./');

async function build(
  input = resolve(__dirname, './test/fixture'),
  options = {},
  assertions = () => {}
) {
  const tree = new GraphQLFilter(input, options);

  const builder = new Builder(tree);

  try {
    await builder.build();
    await assertions(builder.outputPath);
  } finally {
    await builder.cleanup();
  }
}

describe('default options', function() {
  it('should compile .graphql files', async () =>
    build(resolve(__dirname, './test/fixture'), {}, async output => {
      assert.equal(
        ...(await Promise.all([
          fs.readFile('test/expected/my-query.js', 'utf8'),
          fs.readFile(resolve(output, 'my-query.js'), 'utf8')
        ]))
      );
      assert.equal(
        ...(await Promise.all([
          fs.readFile('test/expected/my-fragment.js', 'utf8'),
          fs.readFile(resolve(output, 'my-fragment.js'), 'utf8')
        ]))
      );
    }));
});

describe('keepExtension = true', function() {
  it('should compile .graphql files', async () =>
    build(
      resolve(__dirname, './test/fixture'),
      { keepExtension: true },
      async output => {
        assert.equal(
          ...(await Promise.all([
            fs.readFile('test/expected/my-query.js', 'utf8'),
            fs.readFile(resolve(output, 'my-query.graphql.js'), 'utf8')
          ]))
        );
        assert.equal(
          ...(await Promise.all([
            fs.readFile('test/expected/my-fragment.js', 'utf8'),
            fs.readFile(resolve(output, 'my-fragment.graphql.js'), 'utf8')
          ]))
        );
      }
    ));
});
