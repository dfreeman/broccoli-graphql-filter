# broccoli-graphql-filter

[![Build Status](https://travis-ci.org/csantero/broccoli-graphql-filter.svg?branch=master)](https://travis-ci.org/csantero/broccoli-graphql-filter)

A [broccoli](https://github.com/joliss/broccoli) filter that converts graphql files to an es6 module exporting an AST representation of the query.

## Installation

```bash
npm install --save broccoli-graphql-filter
```

## Configuration

- `keepExtension = false`, _optional_ – If `true`, creates files called
  `my-query.graphql.js` instead of `my-query.js`, so that you can import the
  files as `./my-query.graphql` instead of `./my-query`.

- `parseAt = 'build-time'`, _optional_ - Determines when documents are parsed.
  If set to `'run-time'`, GraphQL documents will be included as tagged template
  strings using `graphql-tag`. If left blank or set to `'build-time'`, documents
  will be included in their parsed JSON format, which is typically larger than
  the source document text, but doesn't require additional work at runtime to parse.
  Note that `'run-time'` requires that the `graphql-tag` package is available to
  import in your application.

## Usage

Given the following .graphql files:

#### my-query.graphql

```graphql
# import * from "./my-fragment.gql"

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
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: {
        kind: 'Name',
        value: 'myQuery'
      },
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'foo'
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'MyFragment'
                  },
                  directives: []
                }
              ]
            }
          }
        ]
      }
    }
  ],
  loc: {
    start: 0,
    end: 77
  }
};
export default doc;
import dep0 from './my-fragment.gql';
doc.definitions = doc.definitions.concat(dep0.definitions);
```

#### my-fragment.js

```js
const doc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: {
        kind: 'Name',
        value: 'MyFragment'
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'Foo'
        }
      },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'hello'
            },
            arguments: [],
            directives: []
          }
        ]
      }
    }
  ],
  loc: {
    start: 0,
    end: 39
  }
};
export default doc;
```

### Import Syntax

Imports of fragments from other locations are specified using comments in a format compatible with a subset of [`graphql-import`](https://oss.prisma.io/content/graphql-import/overview).

To bring all identifiers in a specific module into scope, you can use `*`:

```graphql
# import * from 'path/to/module'
```

To only import specific identifiers, you can write them out separated by commas:

```graphql
# import Foo from 'path/to/foo'
# import Bar, Baz from 'path/to/bar-baz'
```

#### Migrating Import Syntax

Up to `v0.3.2`, `broccoli-graphql-filter` used a coarser-grained import syntax.
In order to align with the broader ecosystem and enable better static analysis opportunities, we've moved to a subset of [`graphql-import`](https://oss.prisma.io/content/graphql-import/overview)'s syntax.

To keep the semantics of your existing imports while migrating to the new syntax, you can perform project-wide find/replace, replacing all instances of `#import` in your project's GraphQL documents with `# import * from`.

## Acknowledgements

The filter code was extracted from https://github.com/bgentry/ember-apollo-client and was originally contributed by https://github.com/dfreeman.
