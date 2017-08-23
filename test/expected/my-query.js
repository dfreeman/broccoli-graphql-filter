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
