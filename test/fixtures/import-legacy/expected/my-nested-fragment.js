const doc = {
  "kind": "Document",
  "definitions": [
    {
      "kind": "FragmentDefinition",
      "name": {
        "kind": "Name",
        "value": "MyNestedFragment"
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
  ],
  "loc": {
    "start": 0,
    "end": 80
  }
};
export default doc;
import dep0 from "./my-fragment";
doc.definitions = doc.definitions.concat(dep0.definitions);
