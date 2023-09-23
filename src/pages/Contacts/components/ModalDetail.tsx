import React, { useContext, useState, useEffect } from "react";
import Modal from "@common/components/Modal";
import { ContactStore } from "@common/store/useContactStore";
import { MODAL_NAME } from "../constant/modal";
import Text from "@common/components/Text";
import { css } from "@emotion/react";
import Button from "@common/components/Button";
import { AddSquareIcon, EditIcon, MinusSquareIcon } from "@assets/icon";
import Input from "@common/components/Input";

type TModalDetail = {
  onAddNewNumber: (id: number, number: string) => void;
  onEditPhoneNumber: (
    oldData: { id: number; number: string },
    newNumber: string
  ) => void;
};

const ModalDetail = ({ onAddNewNumber, onEditPhoneNumber }: TModalDetail) => {
  const [isAddNewPhone, setIsAddNewPhone] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [phones, setPhones] = useState([""]);
  const [editNumber, setEditNumber] = useState({
    isEdit: false,
    idx: 0,
  });
  const { modal, closeModal, openModal } = useContext(ContactStore);

  const modalDetailContactStyle = () => {
    return css({
      padding: "12px 0px",
      ".section-name": {
        display: "flex",
        gap: "4px",
        width: "100%",
        ".first-name, .last-name": {
          flex: "1",
          ".header-title": {
            marginBottom: "4px",
          },
        },
        marginBottom: "12px",
      },
      ".section-phone-number": {
        ".header-container": {
          display: "flex",
          alignItems: "center",
          marginBottom: "4px",
          ".header-title": {
            marginRight: "4px",
          },
        },
        ".phone": {
          marginBottom: "4px",
          "&:last-child": {
            marginBottom: 0,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (modal.name === MODAL_NAME.modalDetailContact) {
      const resPhones = modal.data.phones?.map(
        (phone: { number: string }) => phone.number
      ) || [""];
      setPhones(resPhones);
    }
  }, [modal.name]);

  const onCloseModal = () => {
    closeModal();
    setIsAddNewPhone(false);
    setNewNumber("");
    setPhones([""]);
    setEditNumber({ isEdit: false, idx: 0 });
  };

  return (
    <Modal
      isVisible={modal.name === MODAL_NAME.modalDetailContact}
      header={
        <div css={{ display: "flex", alignItems: "center" }}>
          <Text
            className="header-title"
            text="Detail Contact"
            type="medium"
            size="medium"
          />
          <div css={{ marginLeft: "8px" }}>
            <Button
              label="Edit"
              type="warning"
              onClick={() => openModal(MODAL_NAME.modalEditContact, modal.data)}
            />
          </div>
        </div>
      }
      onClose={onCloseModal}
      content={
        <div css={modalDetailContactStyle}>
          <div className="section-name">
            <div className="first-name">
              <Text className="header-title" text="First Name" type="bold" />
              <Text text={modal.data.first_name || "-"} />
            </div>
            <div className="last-name">
              <Text className="header-title" text="Last Name" type="bold" />
              <Text text={modal.data.last_name || "-"} />
            </div>
          </div>
          <div className="section-phone-number">
            <div className="header-container">
              <Text className="header-title" text="Phones" type="bold" />
              {!editNumber.isEdit ? (
                <div onClick={() => setIsAddNewPhone(!isAddNewPhone)}>
                  {isAddNewPhone ? (
                    <MinusSquareIcon height="12px" width="12px" />
                  ) : (
                    <AddSquareIcon height="12px" width="12px" />
                  )}
                </div>
              ) : null}
            </div>
            {phones?.map((phone, idx) => (
              <div
                className="phone"
                css={{ display: "flex", alignItems: "center" }}
                key={phone}
              >
                <Text key={phone} text={phone} />
                {isAddNewPhone ||
                (editNumber.idx !== idx && editNumber.isEdit) ? null : (
                  <div
                    css={{ marginLeft: "4px" }}
                    onClick={() => {
                      setEditNumber({ isEdit: !editNumber.isEdit, idx });
                      if (editNumber.isEdit) {
                        setNewNumber("");
                      } else {
                        setNewNumber(phone);
                      }
                    }}
                  >
                    <EditIcon height="12px" width="12px" />
                  </div>
                )}
              </div>
            )) || "-"}
            {isAddNewPhone || editNumber.isEdit ? (
              <div css={{ display: "flex" }}>
                <Input
                  value={newNumber}
                  acceptValue="number-only"
                  onChange={setNewNumber}
                />
                <div css={{ marginLeft: "4px" }}>
                  <Button
                    label={isAddNewPhone ? "Add" : "Edit"}
                    disabled={!newNumber}
                    onClick={() => {
                      if (isAddNewPhone) {
                        setPhones((prev) => [...prev, newNumber]);
                        setIsAddNewPhone(false);
                        setNewNumber("");
                        onAddNewNumber(modal.data.id, newNumber);
                      } else {
                        const tempPhones = [...phones];
                        tempPhones[editNumber.idx] = newNumber;
                        setPhones(tempPhones);
                        const oldNumber = phones[editNumber.idx];
                        onEditPhoneNumber(
                          { id: modal.data.id, number: oldNumber },
                          newNumber
                        );
                        setNewNumber("");
                        setEditNumber({ isEdit: false, idx: 0 });
                      }
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      }
    />
  );
};

export default ModalDetail;
