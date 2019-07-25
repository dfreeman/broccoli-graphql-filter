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
                    "value": "FragmentA"
                  },
                  "directives": []
                },
                {
                  "kind": "FragmentSpread",
                  "name": {
                    "kind": "Name",
                    "value": "FragmentC"
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
    "end": 114
  }
};
export default doc;
import dep0 from "./fragments";
doc.definitions = doc.definitions.concat(dep0.definitions.filter(def => /^(FragmentA|FragmentC)$/.test(def.name.value)));
