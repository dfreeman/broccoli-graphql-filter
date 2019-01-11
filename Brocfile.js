"use strict";
var GraphQLFilter = require("./index");
var BroccoliMergeTrees = require("broccoli-merge-trees");

var node = new GraphQLFilter("./test/fixture/");
var nodeWithExt = new GraphQLFilter("./test/fixture-with-ext/", {
  keepExtension: true
});

module.exports = new BroccoliMergeTrees([node, nodeWithExt]);
