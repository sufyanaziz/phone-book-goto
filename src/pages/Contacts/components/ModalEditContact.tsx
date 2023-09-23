import React, { useContext, useEffect, useMemo, useState } from "react";
import Modal from "@common/components/Modal";
import { ContactStore } from "@common/store/useContactStore";
import { MODAL_NAME } from "../constant/modal";
import Text from "@common/components/Text";
import { css } from "@emotion/react";
import Input from "@common/components/Input";
import Button from "@common/components/Button";

type TModalEditContact = {
  onEditContact: (id: number, firstName: string, lastName: string) => void;
  loading: boolean;
  onClose: () => void;
  isComplete: boolean;
};

const ModalEditContact = ({
  onEditContact,
  loading,
  onClose,
  isComplete,
}: TModalEditContact) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);

  const { modal, closeModal } = useContext(ContactStore);

  const isDisabled = useMemo(() => {
    if (loading) return true;
    if (!firstName) return true;
    if (!lastName) return true;
    if (phoneNumbers.some((phone) => !phone)) return true;
    return false;
  }, [firstName, lastName, phoneNumbers, loading]);

  const handleCloseModal = () => {
    onClose();
    closeModal();
    setFirstName("");
    setLastName("");
    setPhoneNumbers([""]);
  };

  useEffect(() => {
    if (modal.name === MODAL_NAME.modalEditContact) {
      setFirstName(modal.data.first_name);
      setLastName(modal.data.last_name);
      setPhoneNumbers(
        modal.data.phones?.map((phone: { number: string }) => phone.number)
      );
    }
  }, [modal.name]);

  useEffect(() => {
    if (!loading && isComplete) {
      handleCloseModal();
    }
  }, [isComplete, loading]);

  const modalEditContactStyle = () => {
    return css({
      padding: "12px 0px",
      ".section-name": {
        ".first-name, .last-name": {
          marginBottom: "8px",
          width: "100%",
          ".input": {
            width: "100%",
          },
        },
      },
      ".header-title": {
        marginBottom: "4px",
      },
      ".section-phone-number": {
        ".phone-container": {
          display: "flex",
          marginBottom: "8px",
          width: "100%",
          "&:last-child": {
            marginBottom: "0px",
          },
          ".icons": {
            display: "flex",
            marginLeft: "8px",
            ".add-icon, .minus-icon": {
              display: "flex",
              alignItems: "center",
            },
          },
        },
      },
    });
  };

  return (
    <Modal
      isVisible={modal.name === MODAL_NAME.modalEditContact}
      header="Edit Contact"
      onClose={handleCloseModal}
      content={
        <div css={modalEditContactStyle}>
          <div className="section-name">
            <div className="first-name">
              <Text className="header-title" text="First Name" type="medium" />
              <Input
                className="input"
                placeholder="Input First Name..."
                acceptValue="string-number"
                value={firstName}
                onChange={setFirstName}
              />
            </div>
            <div className="last-name">
              <Text className="header-title" text="Last Name" type="medium" />
              <Input
                className="input"
                placeholder="Input Last Name..."
                acceptValue="string-number"
                value={lastName}
                onChange={setLastName}
              />
            </div>
          </div>
          <div className="section-phone-number">
            <Text className="header-title" text="Phones" type="medium" />
            {phoneNumbers.map((phone, listIdx) => {
              return (
                <div className="phone-container" key={`phone-${listIdx}`}>
                  <Input
                    className="input"
                    placeholder={`Phone ${listIdx + 1}`}
                    value={phone}
                    acceptValue="number-only"
                    disabled
                    onChange={(value) => {
                      const phones = [...phoneNumbers];
                      phones[listIdx] = value;
                      setPhoneNumbers(phones);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      }
      footer={
        <div className="flex" css={{ padding: "0 12px 12px 12px" }}>
          <Button
            label="Submit"
            onClick={() => onEditContact(modal.data.id, firstName, lastName)}
            disabled={isDisabled}
          />
        </div>
      }
    />
  );
};

export default ModalEditContact;
