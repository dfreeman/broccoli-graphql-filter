const doc = {
  "kind": "Document",
  "definitions": [
    {
      "kind": "OperationDefinition",
      "operation": "query",
      "name": {
        "kind": "Name",
        "value": "MyQuery"
      },
      "variableDefinitions": [],
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
          },
          {
            "kind": "Field",
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
                    "value": "MyNestedFragment"
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
    "end": 127
  }
};
export default doc;
import dep0 from "./my-nested-fragment";
doc.definitions = doc.definitions.concat(dep0.definitions);
import dep1 from "./my-fragment";
doc.definitions = doc.definitions.concat(dep1.definitions);
