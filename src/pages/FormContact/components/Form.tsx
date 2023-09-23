import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "@common/components/Text";
import { css } from "@emotion/react";
import { AddSquareIcon, MinusSquareIcon } from "@assets/icon";
import Button from "@common/components/Button";
import useFormContact from "../hooks/useFormContact";
import Input from "@common/components/Input";
import HeaderTitle from "@common/components/HeaderTitle";

const formContactStyle = () => {
  return css({
    width: "100%",
    ".field-input": {
      display: "flex",
      gap: "4px",
      width: "100%",
      ".input-container": {
        width: "100%",
        marginRight: "12px",
        ":last-child": {
          marginRight: 0,
        },
        ".input": {
          width: "100%",
          marginTop: "4px",
        },
      },
    },
    ".field-phone-numbers": {
      marginTop: "12px",
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

const Form = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);

  const { onAddContact, onEditContact, result, contact } = useFormContact();

  const isDisabled = useMemo(() => {
    if (result.loading) return true;
    if (!firstName) return true;
    if (!lastName) return true;
    if (phoneNumbers.some((phone) => !phone)) return true;
    return false;
  }, [firstName, lastName, phoneNumbers, result.loading]);

  const resetState = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumbers([""]);
  };

  useEffect(() => {
    if (!result.loading && result.isSuccess) {
      navigate("/");
      resetState();
    }
  }, [result.isSuccess, result.loading]);

  useEffect(() => {
    if (contact.isHaveContact) {
      const { contact_by_pk } = contact.data;
      setFirstName(contact_by_pk?.first_name);
      setLastName(contact_by_pk?.last_name);
      setPhoneNumbers(
        contact_by_pk?.phones?.map((phone: { number: string }) => phone.number)
      );
    }
    return () => resetState();
  }, [contact.data]);

  return (
    <div css={formContactStyle}>
      <HeaderTitle
        title={contact.isHaveContact ? "Edit Form Contact" : "Form Contact"}
        css={{ display: "flex", justifyContent: "center" }}
      />
      <div className="field-input">
        <div className="input-container">
          <Text text="First Name" />
          <Input
            className="input"
            placeholder="Input First Name..."
            acceptValue="string-number"
            value={firstName}
            onChange={setFirstName}
          />
        </div>
        <div className="input-container">
          <Text text="Last Name" />
          <Input
            className="input"
            placeholder="Input Last Name..."
            acceptValue="string-number"
            value={lastName}
            onChange={setLastName}
          />
        </div>
      </div>
      <div className="field-phone-numbers">
        <Text text="Phone Numbers" css={{ marginBottom: "4px" }} />
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
                disabled={contact.isHaveContact}
              />
              {!contact.isHaveContact ? (
                <div className="icons">
                  {phoneNumbers.length > 1 ? (
                    <div
                      className="minus-icon"
                      onClick={() => {
                        setPhoneNumbers(
                          phoneNumbers.filter((_, idx) => idx !== listIdx)
                        );
                      }}
                      css={{
                        cursor: contact.isHaveContact ? "not-allowed" : "unset",
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
                    css={{
                      cursor: contact.isHaveContact ? "not-allowed" : "unset",
                    }}
                  >
                    <AddSquareIcon />
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div css={{ marginTop: "16px", width: "100%" }}>
        <Button
          label={!contact.isHaveContact ? "Add Contact" : "Edit Contact"}
          disabled={isDisabled}
          onClick={() => {
            if (!contact.isHaveContact) {
              onAddContact(firstName, lastName, phoneNumbers);
            } else {
              onEditContact(firstName, lastName);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Form;
