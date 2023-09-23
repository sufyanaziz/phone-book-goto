import React, { useContext } from "react";
import Modal from "@common/components/Modal";
import { ContactStore } from "@common/store/useContactStore";
import { MODAL_NAME } from "../constant/modal";
import Text from "@common/components/Text";
import { css } from "@emotion/react";
import Button from "@common/components/Button";

const ModalDetail = () => {
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
        ".header-title": {
          marginBottom: "4px",
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
      onClose={closeModal}
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
            <Text className="header-title" text="Phones" type="bold" />
            {modal.data.phones?.map((phone: { number: string }) => (
              <Text className="phone" key={phone.number} text={phone.number} />
            )) || "-"}
          </div>
        </div>
      }
    />
  );
};

export default ModalDetail;
