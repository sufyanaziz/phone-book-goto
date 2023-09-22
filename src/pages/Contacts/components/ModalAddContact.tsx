import React, { useContext, useEffect, useMemo, useState } from "react";
import Modal from "@common/components/Modal";
import { ContactStore } from "@common/store/useContactStore";
import { MODAL_NAME } from "../constant/modal";
import Text from "@common/components/Text";
import { css } from "@emotion/react";
import Input from "@common/components/Input";
import { AddSquareIcon, MinusSquareIcon } from "assets/icon";
import Button from "@common/components/Button";

type TModalAddContact = {
  onAddNewContact: (
    firstName: string,
    lastName: string,
    phones: string[]
  ) => void;
  loading: boolean;
  onClose: () => void;
  isComplete: boolean;
};

const ModalAddContact = ({
  onAddNewContact,
  loading,
  onClose,
  isComplete,
}: TModalAddContact) => {
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
    if (!loading && isComplete) {
      handleCloseModal();
    }
  }, [isComplete, loading]);

  const modalAddContactStyle = () => {
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
      isVisible={modal.name === MODAL_NAME.modalAddContact}
      header="Add New Contact"
      onClose={handleCloseModal}
      content={
        <div css={modalAddContactStyle}>
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
                    onChange={(value) => {
                      const phones = [...phoneNumbers];
                      phones[listIdx] = value;
                      setPhoneNumbers(phones);
                    }}
                  />
                  <div className="icons">
                    {phoneNumbers.length > 1 ? (
                      <div
                        className="minus-icon"
                        onClick={() => {
                          setPhoneNumbers(
                            phoneNumbers.filter((_, idx) => idx !== listIdx)
                          );
                        }}
                      >
                        <MinusSquareIcon />
                      </div>
                    ) : null}
                    <div
                      className="add-icon"
                      onClick={() => {
                        setPhoneNumbers((prev) => [...prev, ""]);
                      }}
                    >
                      <AddSquareIcon />
                    </div>
                  </div>
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
            onClick={() => onAddNewContact(firstName, lastName, phoneNumbers)}
            disabled={isDisabled}
          />
        </div>
      }
    />
  );
};

export default ModalAddContact;
