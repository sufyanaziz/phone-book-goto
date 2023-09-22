import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_NEW_CONTACT } from "@common/graphql/formContact";

const useFormContact = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [insert_contact, { data, ...rest }] = useMutation(ADD_NEW_CONTACT, {
    onCompleted: () => {
      setIsSuccess(true);
    },
  });

  return {
    addNewContact: insert_contact,
    result: {
      data,
      isSuccess,
      loading: rest.loading,
      error: rest.error,
    },
  };
};

export default useFormContact;
