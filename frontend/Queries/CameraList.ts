import { gql } from '@apollo/client'

const QUERY_CAMERA_LIST = gql`
query {
  cameras {
    id
    name
  }
}
`;

export default QUERY_CAMERA_LIST;
