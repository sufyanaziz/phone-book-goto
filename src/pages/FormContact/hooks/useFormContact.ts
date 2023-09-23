import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { ADD_NEW_CONTACT, EDIT_CONTACT } from "@common/graphql/formContact";
import { GET_CONTACT_DETAIL } from "@common/graphql/contact";
import useRoute from "@common/utils/useRoute";
import { MessageStore } from "@common/store/useMessageStore";

const useFormContact = () => {
  const { queryUrl } = useRoute();
  const [isSuccess, setIsSuccess] = useState(false);
  const id = queryUrl.get("id");

  const { setShowMessage } = useContext(MessageStore);

  const contactDetail = useQuery(GET_CONTACT_DETAIL, {
    skip: id ? false : true,
    variables: {
      id: Number(id),
    },
  });

  const [insert_contact, { data, ...rest }] = useMutation(ADD_NEW_CONTACT, {
    onCompleted: () => {
      setIsSuccess(true);
      setShowMessage("successAddContact", true);
    },
  });

  const [update_contact_by_pk, updateContact] = useMutation(EDIT_CONTACT, {
    onCompleted: () => {
      setIsSuccess(true);
      setShowMessage("successEditContact", true);
    },
  });

  return {
    result: {
      data,
      isSuccess,
      loading: rest.loading || updateContact.loading,
      error: rest.error || updateContact.error,
    },
    contact: {
      data: contactDetail.data,
      loading: contactDetail.loading,
      error: contactDetail.error,
      isHaveContact: !!contactDetail.data?.contact_by_pk,
    },
    onAddContact: (firstName: string, lastName: string, phones: string[]) => {
      insert_contact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: phones.map((phone) => ({ number: phone })),
        },
      });
    },
    onEditContact: (firstName: string, lastName: string) => {
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
  };
};

export default useFormContact;
