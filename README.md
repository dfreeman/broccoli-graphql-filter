# broccoli-graphql-filter
A [broccoli](https://github.com/joliss/broccoli) filter that converts graphql files to an es6 module exporting the graphql text.

## Installation

```bash
npm install --save broccoli-graphql-filter
```

## Usage

Given the following .graphql file:

```graphql
query myQuery {
  foo(id: "1234") {
    bar
  }
}
```

the filter will output the following JS:

```js
const text = `
query myQuery {
  foo(id: "1234") {
    bar
  }
}
`;
export default text;
```
