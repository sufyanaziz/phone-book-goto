import React, { useCallback, useContext, useEffect, useMemo } from "react";
import Loader from "@common/components/Loader";
import Button from "@common/components/Button";
import useContact from "./hooks/useContact";
import CardContact from "./components/CardContact";
import Text from "@common/components/Text";
import Container from "@common/components/Container";
import HeaderTitle from "@common/components/HeaderTitle";
import SearchBar from "./components/SearchBar";
import { ContactStore } from "@common/store/useContactStore";
import { useNavigate } from "react-router-dom";
import ModalDetail from "./components/ModalDetail";
import ModalAddContact from "./components/ModalAddContact";
import ModalEditContact from "./components/ModalEditContact";
import Message from "@common/components/Message";
import "./style/index.css";

const LIMIT = 10;

const Contacts = () => {
  const navigate = useNavigate();
  const { offset, onSetOffset, openModal } = useContext(ContactStore);
  const { data, loading, totalRow, ...rest } = useContact({ limit: LIMIT });

  const pagination = useMemo(() => {
    return {
      totalList: data?.length || 0,
      totalRow,
      currentPage: (LIMIT + offset) / LIMIT,
      totalPage: Math.ceil(totalRow / LIMIT),
      activePage: `${(LIMIT + offset) / LIMIT}/${Math.ceil(totalRow / LIMIT)}`,
    };
  }, [data, offset, totalRow]);

  useEffect(() => {
    rest.refetchContact();
    rest.refetchContactAggregate();
  }, []);

  const renderData = useCallback(() => {
    if (loading) return <Loader />;
    if (!data?.length) return <Text text="Data is not found" />;
    return data.map((item) => {
      return (
        <CardContact
          key={item.id}
          data={item}
          onEdit={(data) => {
            navigate(`/form?id=${data.id}`);
          }}
          onDelete={(data) => {
            const confirm = window.confirm(`delete ${data.first_name}`);
            if (confirm) {
              rest.deleteContact.onDeleteContact(data.id);
            }
          }}
          onDetail={(contact) => {
            openModal("modal-detail-contact", contact);
          }}
        />
      );
    });
  }, [data, loading]);

  return (
    <div className="contact-page">
      <Container>
        <HeaderTitle title="Contact List" />
        <SearchBar />
        <Message />
        <div className="contact-page-content" css={{ marginBottom: 12 }}>
          {renderData()}
        </div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            text={`showing ${pagination.totalList} of ${totalRow} data (${pagination.activePage})`}
          />
          <div css={{ display: "flex", gap: "4px" }}>
            <Button
              label="Prev"
              disabled={!offset}
              onClick={() => {
                onSetOffset(offset - LIMIT);
              }}
            />
            <Button
              label="Next"
              disabled={
                data?.length !== LIMIT || !((LIMIT + offset) % totalRow)
              }
              onClick={() => {
                onSetOffset(offset + LIMIT);
              }}
            />
          </div>
        </div>
      </Container>
      <ModalDetail
        onAddNewNumber={rest.addNewNumber.onAddNewNumber}
        onEditPhoneNumber={rest.editPhoneNumber.onEditPhoneNumber}
      />
      <ModalAddContact
        loading={rest.addContact.loading}
        onAddNewContact={rest.addContact.onAddNewContact}
        onClose={rest.resetState}
        isComplete={rest.isComplete}
      />
      <ModalEditContact
        loading={rest.editContact.loading}
        onEditContact={rest.editContact.onEditContact}
        onClose={rest.resetState}
        isComplete={rest.isComplete}
      />
    </div>
  );
};

export default Contacts;
