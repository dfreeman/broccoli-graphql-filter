const doc = {
  "kind": "Document",
  "definitions": [
    {
      "kind": "FragmentDefinition",
      "name": {
        "kind": "Name",
        "value": "FragmentA"
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
            "name": {
              "kind": "Name",
              "value": "hello"
            },
            "arguments": [],
            "directives": []
          }
        ]
      }
    },
    {
      "kind": "FragmentDefinition",
      "name": {
        "kind": "Name",
        "value": "FragmentB"
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
            "name": {
              "kind": "Name",
              "value": "goodbye"
            },
            "arguments": [],
            "directives": []
          }
        ]
      }
    },
    {
      "kind": "FragmentDefinition",
      "name": {
        "kind": "Name",
        "value": "FragmentC"
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
            "name": {
              "kind": "Name",
              "value": "what"
            },
            "arguments": [],
            "directives": []
          }
        ]
      }
    }
  ],
  "loc": {
    "start": 0,
    "end": 117
  }
};
export default doc;
