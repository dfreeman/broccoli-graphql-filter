

# broccoli-graphql-filter

[![Build Status](https://travis-ci.org/csantero/broccoli-graphql-filter.svg?branch=master)](https://travis-ci.org/csantero/broccoli-graphql-filter)

A [broccoli](https://github.com/joliss/broccoli) filter that converts graphql files to an es6 module exporting an AST representation of the query.

## Installation

```bash
npm install --save broccoli-graphql-filter
```

## Usage

Given the following .graphql files:

#### my-query.graphql
```graphql
#import "./my-fragment.gql"

query myQuery {
  foo {
    ...MyFragment
  }
}
```

#### my-fragment.graphql
```graphql
fragment MyFragment on Foo {
  hello
}
```

the filter will output the following JS:

#### my-query.js
```js
const doc = {
  "kind": "Document",
  "definitions": [
    {
      "kind": "OperationDefinition",
      "operation": "query",
      "name": {
        "kind": "Name",
        "value": "myQuery"
      },
      "variableDefinitions": [],
      "directives": [],
      "selectionSet": {
        "kind": "SelectionSet",
        "selections": [
          {
            "kind": "Field",
            "alias": null,
            "name": {
              "kind": "Name",
              "value": "foo"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": {
              "kind": "SelectionSet",
              "selections": [
                {
                  "kind": "FragmentSpread",
                  "name": {
                    "kind": "Name",
                    "value": "MyFragment"
                  },
                  "directives": []
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "loc": {
    "start": 0,
    "end": 77
  }
};
export default doc;
import dep0 from "./my-fragment.gql";
doc.definitions = doc.definitions.concat(dep0.definitions);
```

#### my-fragment.js
```js
const doc = {
  "kind": "Document",
  "definitions": [
    {
      "kind": "FragmentDefinition",
      "name": {
        "kind": "Name",
        "value": "MyFragment"
      },
      "typeCondition": {
        "kind": "NamedType",
        "name": {
          "kind": "Name",
          "value": "Foo"
        }
      },
      "directives": [],
      "selectionSet": {
        "kind": "SelectionSet",
        "selections": [
          {
            "kind": "Field",
            "alias": null,
            "name": {
              "kind": "Name",
              "value": "hello"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": null
          }
        ]
      }
    }
  ],
  "loc": {
    "start": 0,
    "end": 39
  }
};
export default doc;
```

## Acknowledgements
The filter code was extracted from https://github.com/bgentry/ember-apollo-client and was originally contributed by https://github.com/dfreeman.
