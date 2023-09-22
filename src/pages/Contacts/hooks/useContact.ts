import {
  ApolloError,
  useQuery,
  useMutation,
  MutationFunctionOptions,
  OperationVariables,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import {
  DELETE_CONTACT,
  GET_CONTACT,
  GET_COUNT_CONTACT,
} from "@common/graphql/contact";
import useDebounce from "@common/hooks/useDebounce";
import { ContactStore } from "@common/store/useContactStore";
import { useContext } from "react";

type TUseContact = {
  limit: number;
};

type TDataContacts = {
  data:
    | {
        id: number;
        first_name: string;
        last_name: string;
        phones: { number: string }[];
      }[]
    | undefined;
  loading: boolean;
  error?: ApolloError;
  totalRow: number;
  refetchContact: () => void;
  refetchContactAggregate: () => void;
  deleteContact: {
    delete_contact_by_pk: (
      options?:
        | MutationFunctionOptions<
            any,
            OperationVariables,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined
    ) => Promise<any>;
    data: any;
    loading: boolean;
  };
};

const useContact = ({ limit }: TUseContact): TDataContacts => {
  const { search, offset } = useContext(ContactStore);

  const debounceSearch = useDebounce(search, 800);

  const { data, loading, error, refetch } = useQuery(GET_CONTACT, {
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

  const [delete_contact_by_pk, deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_CONTACT, GET_COUNT_CONTACT],
  });

  return {
    data: data?.contact,
    loading,
    error,
    totalRow: contactAggregate.data?.contact_aggregate?.aggregate?.count || 0,
    refetchContact: refetch,
    refetchContactAggregate: contactAggregate.refetch,
    deleteContact: {
      delete_contact_by_pk,
      data: deleteContact.data,
      loading: deleteContact.loading,
    },
  };
};

export default useContact;
