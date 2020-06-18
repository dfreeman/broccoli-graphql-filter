import gql from 'graphql-tag';
const doc = gql`fragment MyFragment on Foo {
  hello(input: "say \\"hi\\"")
}
`;
export default doc;
