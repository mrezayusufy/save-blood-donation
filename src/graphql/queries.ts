import { gql } from "urql";

export const DONORS_QUERY = gql`
query donors {
  usersPermissionsUsers(filters:{userRole:{eq: "donor"}}){
    data {
      id
      attributes {
        fullname
        bloodgroup
        city
        requests {
          data {
            id
            attributes{
              action              
            }
          }
        }
      }
    }
  }
}
`;

export const SEND_REQUEST = gql`
mutation request($donor: ID, $acceptor: ID){
  createRequest(data: {donor: $donor, acceptor: $acceptor, action: pending}){
    data {
      id
      attributes {
        action
        donor {
          data {
            id
            attributes{
              fullname
            }
          }
        }
        acceptor {
          data {
            id
            attributes{
              fullname
            }
          }
        }
      }
    }
  }
}
`