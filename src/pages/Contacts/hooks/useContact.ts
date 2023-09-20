import { ApolloError, gql, useQuery } from "@apollo/client";
import useDebounce from "@common/hooks/useDebounce";
import { ContactStore } from "@common/store/useContactStore";
import { useContext } from "react";

const GET_CONTACT = gql`
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

const GET_COUNT_CONTACT = gql`
  query {
    contact_aggregate {
      aggregate {
        count
      }
    }
  }
`;

type TUseContact = {
  limit: number;
};

type TDataContacts = {
  data:
    | {
        id: number;
        first_name: string;
        lastName: string;
        phones: { number: string }[];
      }[]
    | undefined;
  loading: boolean;
  error?: ApolloError;
  totalRow: number;
};

const useContact = ({ limit }: TUseContact): TDataContacts => {
  const { search, offset } = useContext(ContactStore);

  const debounceSearch = useDebounce(search, 800);

  const { data, loading, error } = useQuery(GET_CONTACT, {
    variables: {
      limit,
      offset,
      where: {
        first_name: {
          _like: `%${debounceSearch}%`,
        },
      },
    },
  });

  const contactAggregate = useQuery(GET_COUNT_CONTACT);

  return {
    data: data?.contact,
    loading,
    error,
    totalRow: contactAggregate.data?.contact_aggregate?.aggregate?.count || 0,
  };
};

export default useContact;
