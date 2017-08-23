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
