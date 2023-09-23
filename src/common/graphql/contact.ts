import { gql } from "@apollo/client";

export const GET_CONTACT = gql`
  query GetContact($limit: Int, $offset: Int, $where: contact_bool_exp) {
    contact(limit: $limit, offset: $offset, where: $where) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const GET_COUNT_CONTACT = gql`
  query GetContactAggregate {
    contact_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export const GET_CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;
