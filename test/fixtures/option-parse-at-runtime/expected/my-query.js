import gql from 'graphql-tag';
const doc = gql`# import * from "./my-fragment.graphql"

query MyQuery {
  foo {
    ...MyFragment
  }
}
`;
export default doc;
import dep0 from "./my-fragment.graphql";
doc.definitions = doc.definitions.concat(dep0.definitions);
