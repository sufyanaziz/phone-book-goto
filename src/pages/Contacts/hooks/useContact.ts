import { ApolloError, useQuery, useMutation } from "@apollo/client";
import {
  DELETE_CONTACT,
  GET_CONTACT,
  GET_COUNT_CONTACT,
} from "@common/graphql/contact";
import { ADD_NEW_CONTACT, EDIT_CONTACT } from "@common/graphql/formContact";
import useDebounce from "@common/hooks/useDebounce";
import { ContactStore } from "@common/store/useContactStore";
import { MessageStore } from "@common/store/useMessageStore";
import { useContext, useState } from "react";

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
  isComplete: boolean;
  refetchContact: () => void;
  refetchContactAggregate: () => void;
  deleteContact: {
    onDeleteContact: (id: number) => void;
    data: any;
    loading: boolean;
  };
  addContact: {
    onAddNewContact: (
      firstName: string,
      lastName: string,
      phones: string[]
    ) => void;
    data: any;
    loading: boolean;
  };
  editContact: {
    onEditContact: (id: number, firstName: string, lastName: string) => void;
    data: any;
    loading: boolean;
  };
  resetState: () => void;
};

const useContact = ({ limit }: TUseContact): TDataContacts => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { search, offset } = useContext(ContactStore);
  const { setShowMessage } = useContext(MessageStore);

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
    onCompleted: () => {
      setIsComplete(true);
      setShowMessage("successRemoveContact", true);
    },
  });

  const [insert_contact, addNewContact] = useMutation(ADD_NEW_CONTACT, {
    refetchQueries: [GET_CONTACT, GET_COUNT_CONTACT],
    onCompleted: () => {
      setIsComplete(true);
      setShowMessage("successAddContact", true);
    },
  });

  const [update_contact_by_pk, updateContact] = useMutation(EDIT_CONTACT, {
    refetchQueries: [GET_CONTACT, GET_COUNT_CONTACT],
    onCompleted: () => {
      setIsComplete(true);
      setShowMessage("successEditContact", true);
    },
  });

  return {
    data: data?.contact,
    loading,
    error,
    isComplete,
    totalRow: contactAggregate.data?.contact_aggregate?.aggregate?.count || 0,
    refetchContact: refetch,
    refetchContactAggregate: contactAggregate.refetch,
    deleteContact: {
      onDeleteContact: (id: number) => {
        delete_contact_by_pk({
          variables: {
            id,
          },
        });
      },
      data: deleteContact.data,
      loading: deleteContact.loading,
    },
    addContact: {
      onAddNewContact: (firstName, lastName, phones) => {
        insert_contact({
          variables: {
            first_name: firstName,
            last_name: lastName,
            phones: phones.map((phone) => ({ number: phone })),
          },
        });
      },
      data: addNewContact.data,
      loading: addNewContact.loading,
    },
    editContact: {
      onEditContact: (id: number, firstName: string, lastName: string) => {
        update_contact_by_pk({
          variables: {
            id: Number(id),
            _set: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });
      },
      data: updateContact.data,
      loading: updateContact.loading,
    },
    resetState: () => {
      setIsComplete(false);
    },
  };
};

export default useContact;
